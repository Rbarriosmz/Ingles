# ---------------------------------------------------------------
# Extrae paginas de un PDF escaneado reconstruyendo el diseno.
#
# El texto plano que devuelve el OCR aplasta las columnas: la rejilla
# de opciones A/B/C/D sale como "A A A A ... B B B B ...", inservible.
# Este script usa las coordenadas de cada palabra para:
#   1. detectar si la pagina va a una o dos columnas
#   2. agrupar palabras en lineas por su altura real
#   3. detectar rejillas de opciones y devolverlas fila por fila
#
# Solo APIs nativas de Windows: ni poppler ni tesseract.
# ---------------------------------------------------------------
param(
  [Parameter(Mandatory=$true)][string]$Path,
  [int]$From = 0,
  [int]$To = 0,
  [int]$Width = 2600,
  [string]$Lang = 'en-GB',
  [string]$OutFile = ''
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op,$type){ $m=$asTaskGeneric.MakeGenericMethod($type); $t=$m.Invoke($null,@($op)); $t.Wait(-1)|Out-Null; $t.Result }
$asTaskAction = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]
function AwaitAction($a){ $t=$asTaskAction.Invoke($null,@($a)); $t.Wait(-1)|Out-Null }

$null = [Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument,Windows.Data.Pdf,ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine,Windows.Media.Ocr,ContentType=WindowsRuntime]
$null = [Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime]

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage((New-Object Windows.Globalization.Language $Lang))
if ($null -eq $engine) { Write-Output "No hay motor OCR para $Lang"; exit 1 }

$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($Path)) ([Windows.Storage.StorageFile])
$pdf  = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)) ([Windows.Data.Pdf.PdfDocument])

$total = $pdf.PageCount
if ($To -le 0 -or $To -ge $total) { $To = $total - 1 }

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("# Extraido de: $([System.IO.Path]::GetFileName($Path))")
[void]$sb.AppendLine("# Paginas $($From+1) a $($To+1) de $total  ·  OCR $Lang  ·  render $Width px")
[void]$sb.AppendLine("# MATERIAL CON DERECHOS DE AUTOR - USO PERSONAL - NO PUBLICAR")
[void]$sb.AppendLine("")

$t0 = Get-Date

for ($i = $From; $i -le $To; $i++) {
  $page = $pdf.GetPage($i)
  $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
  $opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
  $opts.DestinationWidth = $Width
  AwaitAction ($page.RenderToStreamAsync($stream, $opts))
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bmp = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $res = Await ($engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])

  # --- recoger palabras con caja ---
  $words = New-Object System.Collections.ArrayList
  foreach ($line in $res.Lines) {
    foreach ($w in $line.Words) {
      [void]$words.Add([pscustomobject]@{
        T=$w.Text; X=[int]$w.BoundingRect.X; Y=[int]$w.BoundingRect.Y
        W=[int]$w.BoundingRect.Width; H=[int]$w.BoundingRect.Height
        CX=[int]($w.BoundingRect.X + $w.BoundingRect.Width/2)
      })
    }
  }

  [void]$sb.AppendLine("===================== PAGINA $($i+1) =====================")

  if ($words.Count -eq 0) { [void]$sb.AppendLine("(sin texto reconocible)"); $bmp.Dispose(); $stream.Dispose(); continue }

  $altoMedio = ($words | Measure-Object H -Average).Average
  $tolerancia = [Math]::Max(8, [int]($altoMedio * 0.55))

  # --- detectar rejilla de opciones: letras A/B/C/D sueltas alineadas ---
  $letras = @($words | Where-Object { $_.T -match '^[ABCD]$' })
  $esRejilla = $false
  $colsRejilla = @()
  if ($letras.Count -ge 8) {
    $grupos = $letras | Group-Object { [int]([Math]::Round($_.X / 100)) * 100 }
    $colsRejilla = @($grupos | Where-Object { $_.Count -ge 3 } | Sort-Object { [int]$_.Name })
    if ($colsRejilla.Count -ge 3) { $esRejilla = $true }
  }

  if ($esRejilla) {
    [void]$sb.AppendLine("--- REJILLA DE OPCIONES detectada ($($colsRejilla.Count) columnas) ---")
  } else {
    # --- detectar dos columnas de texto: hueco vertical ancho y vacio ---
    $maxX = ($words | Measure-Object X -Maximum).Maximum
    $medio = [int]($maxX / 2)
    $franja = @($words | Where-Object { $_.CX -gt ($medio - 90) -and $_.CX -lt ($medio + 90) })
    $dosColumnas = ($franja.Count -lt ($words.Count * 0.06)) -and ($words.Count -gt 90)
    if ($dosColumnas) { [void]$sb.AppendLine("--- DOS COLUMNAS detectadas (se leen por separado) ---") }
  }

  # --- agrupar en lineas por Y y ordenar por X ---
  function Emitir($conjunto, $etiqueta) {
    if ($etiqueta) { [void]$sb.AppendLine("[$etiqueta]") }
    $orden = @($conjunto | Sort-Object Y)
    $lineas = New-Object System.Collections.ArrayList
    $actual = New-Object System.Collections.ArrayList
    $baseY = $null
    foreach ($w in $orden) {
      if ($null -eq $baseY -or [Math]::Abs($w.Y - $baseY) -le $tolerancia) {
        if ($null -eq $baseY) { $baseY = $w.Y }
        [void]$actual.Add($w)
      } else {
        [void]$lineas.Add($actual); $actual = New-Object System.Collections.ArrayList
        [void]$actual.Add($w); $baseY = $w.Y
      }
    }
    if ($actual.Count) { [void]$lineas.Add($actual) }
    foreach ($ln in $lineas) {
      $txt = (($ln | Sort-Object X | ForEach-Object { $_.T }) -join ' ')
      if ($txt.Trim()) { [void]$sb.AppendLine($txt) }
    }
  }

  if (-not $esRejilla) {
    $maxX = ($words | Measure-Object X -Maximum).Maximum
    $medio = [int]($maxX / 2)
    $franja = @($words | Where-Object { $_.CX -gt ($medio - 90) -and $_.CX -lt ($medio + 90) })
    if (($franja.Count -lt ($words.Count * 0.06)) -and ($words.Count -gt 90)) {
      Emitir @($words | Where-Object { $_.CX -le $medio }) "columna izquierda"
      [void]$sb.AppendLine("")
      Emitir @($words | Where-Object { $_.CX -gt $medio }) "columna derecha"
    } else {
      Emitir $words $null
    }
  } else {
    Emitir $words $null
  }

  [void]$sb.AppendLine("")
  $bmp.Dispose(); $stream.Dispose()
}

$secs = [math]::Round(((Get-Date) - $t0).TotalSeconds, 1)
$pages = $To - $From + 1
Write-Output "### $pages paginas en $secs s ($([math]::Round($secs/$pages,2)) s/pagina)"

if ($OutFile) {
  $dir = Split-Path $OutFile -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  [System.IO.File]::WriteAllText($OutFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding $false))
  Write-Output "### guardado en $OutFile"
} else {
  Write-Output $sb.ToString()
}

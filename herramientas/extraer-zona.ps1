# Extrae solo una franja horizontal de la pagina.
#
# Las paginas de clave del Trainer llevan las respuestas en una
# columna estrecha a la izquierda y un texto de ejemplo de Writing
# ocupando el resto. Reconstruir la pagina entera las entremezcla.
# Con -Desde y -Hasta (porcentaje del ancho) se aisla la columna.
param(
  [Parameter(Mandatory=$true)][string]$Path,
  [Parameter(Mandatory=$true)][int]$Page,
  [double]$Desde = 0.0,
  [double]$Hasta = 0.5,
  [int]$Width = 5000,
  [string]$Lang = 'en-GB'
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null
$g = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($o,$t){ $m=$g.MakeGenericMethod($t); $k=$m.Invoke($null,@($o)); $k.Wait(-1)|Out-Null; $k.Result }
$ga = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]
function AwaitAction($a){ $t=$ga.Invoke($null,@($a)); $t.Wait(-1)|Out-Null }

$null = [Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument,Windows.Data.Pdf,ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine,Windows.Media.Ocr,ContentType=WindowsRuntime]
$null = [Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime]

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage((New-Object Windows.Globalization.Language $Lang))
$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($Path)) ([Windows.Storage.StorageFile])
$pdf  = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)) ([Windows.Data.Pdf.PdfDocument])

$pg = $pdf.GetPage($Page)
$stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
$opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
$opts.DestinationWidth = $Width
AwaitAction ($pg.RenderToStreamAsync($stream,$opts))
$decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
$bmp = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
$res = Await ($engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])

$words = New-Object System.Collections.ArrayList
foreach ($line in $res.Lines) {
  foreach ($w in $line.Words) {
    $cx = $w.BoundingRect.X + $w.BoundingRect.Width/2
    if ($cx -lt ($Width*$Desde) -or $cx -gt ($Width*$Hasta)) { continue }
    [void]$words.Add([pscustomobject]@{T=$w.Text; X=[int]$w.BoundingRect.X; Y=[int]$w.BoundingRect.Y; H=[int]$w.BoundingRect.Height})
  }
}

if ($words.Count -eq 0) { Write-Output "(sin texto en esa franja)"; exit }

$tol = [Math]::Max(8, [int](($words | Measure-Object H -Average).Average * 0.55))
$orden = @($words | Sort-Object Y)
$lineas = New-Object System.Collections.ArrayList
$actual = New-Object System.Collections.ArrayList
$base = $null
foreach ($w in $orden) {
  if ($null -eq $base -or [Math]::Abs($w.Y - $base) -le $tol) {
    if ($null -eq $base) { $base = $w.Y }
    [void]$actual.Add($w)
  } else {
    [void]$lineas.Add($actual); $actual = New-Object System.Collections.ArrayList
    [void]$actual.Add($w); $base = $w.Y
  }
}
if ($actual.Count) { [void]$lineas.Add($actual) }

Write-Output ("### pagina $($Page+1), franja $([int]($Desde*100))%-$([int]($Hasta*100))% del ancho, $($words.Count) palabras")
foreach ($ln in $lineas) {
  $t = (($ln | Sort-Object X | ForEach-Object { $_.T }) -join ' ')
  if ($t.Trim()) { Write-Output $t }
}
$bmp.Dispose(); $stream.Dispose()

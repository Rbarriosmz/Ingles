# Cifra data/local.js en data/vault.js
#
# El repositorio guarda solo el resultado cifrado. Ninguna contrasena
# acaba dentro: se escriben aqui una vez, al cifrar, y despues cada
# usuario abre el material con la suya al entrar en la web.
#
# Va en sobre, no con una clave sola:
#
#   1. el contenido se cifra UNA vez con una clave aleatoria de 256
#      bits, que no deriva de nada (la clave de contenido);
#   2. esa clave se guarda envuelta una vez por usuario, cifrada con
#      lo que sale de PBKDF2-SHA256 sobre SU contrasena de acceso.
#
# Asi el archivo pesa lo mismo con uno o con diez usuarios, y anadir o
# quitar a alguien no obliga a recifrar 90 KB de texto.
#
# Todo lleva HMAC-SHA256 sobre iv+cifrado, verificado antes de descifrar.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File herramientas/cifrar.ps1
#
param(
  [string]$Entrada = 'data/local.js',
  [string]$Salida  = 'data/vault.js',
  [int]$Iteraciones = 200000
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Entrada)) { Write-Output "No existe $Entrada"; exit 1 }

$sinBom = New-Object System.Text.UTF8Encoding $false

function Leer-Contrasena($etiqueta) {
  $sec = Read-Host -AsSecureString $etiqueta
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
  $txt = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  return $txt
}

function B64($b) { [Convert]::ToBase64String([byte[]]$b) }

# Cifra $datos con 64 bytes de clave y devuelve @{iv;mac;data}
function Cifra-Bloque([byte[]]$km, [byte[]]$datos) {
  $kEnc = $km[0..31]; $kMac = $km[32..63]
  $iv = New-Object byte[] 16
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($iv)

  $aes = [System.Security.Cryptography.Aes]::Create()
  $aes.KeySize = 256; $aes.Mode = 'CBC'; $aes.Padding = 'PKCS7'
  $aes.Key = $kEnc; $aes.IV = $iv
  $enc = $aes.CreateEncryptor()
  $cif = $enc.TransformFinalBlock($datos, 0, $datos.Length)
  $enc.Dispose(); $aes.Dispose()

  # encrypt-then-MAC: se firma iv+cifrado, no el texto claro
  $firmado = New-Object byte[] ($iv.Length + $cif.Length)
  [Array]::Copy($iv, 0, $firmado, 0, $iv.Length)
  [Array]::Copy($cif, 0, $firmado, $iv.Length, $cif.Length)
  $hmac = New-Object System.Security.Cryptography.HMACSHA256(,[byte[]]$kMac)
  $mac = $hmac.ComputeHash($firmado)
  $hmac.Dispose()

  return @{ iv = (B64 $iv); mac = (B64 $mac); data = $cif }
}

# --- quien puede abrirlo ---
$usuarios = @()
Write-Output "Contrasenas de acceso de quienes deben poder abrir el material."
Write-Output "Deja el usuario en blanco para terminar."
Write-Output ""
while ($true) {
  $id = Read-Host "Usuario"
  if ([string]::IsNullOrWhiteSpace($id)) { break }
  $p1 = Leer-Contrasena "  Contrasena de $id"
  if ([string]::IsNullOrWhiteSpace($p1)) { Write-Output "  vacia, se salta"; continue }
  $p2 = Leer-Contrasena "  Repitela"
  if ($p1 -ne $p2) { Write-Output "  no coinciden, se salta"; continue }
  $usuarios += @{ id = $id.Trim().ToLower(); pass = $p1 }
  Write-Output "  anadido"
}
if ($usuarios.Count -eq 0) { Write-Output "Sin usuarios, cancelado"; exit 1 }

# --- clave de contenido: aleatoria, no derivada de ninguna contrasena ---
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$cek = New-Object byte[] 64
$rng.GetBytes($cek)

$plano = [System.Text.Encoding]::UTF8.GetBytes([System.IO.File]::ReadAllText($Entrada, $sinBom))
$cuerpo = Cifra-Bloque $cek $plano

# --- un sobre por usuario ---
$sobres = New-Object System.Collections.ArrayList
foreach ($u in $usuarios) {
  $salt = New-Object byte[] 16
  $rng.GetBytes($salt)
  $kdf = New-Object System.Security.Cryptography.Rfc2898DeriveBytes(
    $u.pass, $salt, $Iteraciones, [System.Security.Cryptography.HashAlgorithmName]::SHA256)
  $kek = $kdf.GetBytes(64)
  $sobre = Cifra-Bloque $kek $cek
  [void]$sobres.Add([pscustomobject]@{
    id = $u.id; salt = (B64 $salt); iv = $sobre.iv; mac = $sobre.mac; wrapped = (B64 $sobre.data)
  })
}

# --- se escribe ---
$barra = [char]47; $ast = [char]42
$L = New-Object System.Collections.ArrayList
[void]$L.Add(($barra + $ast + ' Material privado CIFRADO. Aqui no hay nada legible.'))
[void]$L.Add('')
[void]$L.Add('   AES-256-CBC con clave de contenido aleatoria, envuelta una vez por')
[void]$L.Add(("   usuario con PBKDF2-SHA256 y $Iteraciones iteraciones sobre su contrasena"))
[void]$L.Add('   de acceso. Todo firmado con HMAC-SHA256 sobre iv+cifrado.')
[void]$L.Add('')
[void]$L.Add('   Ninguna contrasena esta en este archivo ni en el repositorio: cada')
[void]$L.Add('   usuario abre el material al entrar en la web, en su navegador.')
[void]$L.Add('   Sin una de ellas esto es ruido.')
[void]$L.Add('')
[void]$L.Add(('   Regenerar: powershell -ExecutionPolicy Bypass -File herramientas/cifrar.ps1 ' + $ast + $barra))
[void]$L.Add('')
[void]$L.Add('window.REGISTER_VAULT({')
[void]$L.Add('  v: 2,')
[void]$L.Add("  cipher: 'AES-CBC',")
[void]$L.Add(("  iv:   '$($cuerpo.iv)',"))
[void]$L.Add(("  mac:  '$($cuerpo.mac)',"))
[void]$L.Add(("  data: '$(B64 $cuerpo.data)',"))
[void]$L.Add('  keys: {')
for ($i = 0; $i -lt $sobres.Count; $i++) {
  $s = $sobres[$i]
  $coma = if ($i -lt $sobres.Count - 1) { ',' } else { '' }
  [void]$L.Add("    '$($s.id)': {")
  [void]$L.Add(("      kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: $Iteraciones, salt: '$($s.salt)' },"))
  [void]$L.Add(("      iv: '$($s.iv)',"))
  [void]$L.Add(("      mac: '$($s.mac)',"))
  [void]$L.Add(("      wrapped: '$($s.wrapped)'"))
  [void]$L.Add("    }$coma")
}
[void]$L.Add('  }')
[void]$L.Add('});')

[System.IO.File]::WriteAllText($Salida, ($L -join "`n") + "`n", $sinBom)

$kb = [math]::Round((Get-Item $Salida).Length / 1KB, 1)
Write-Output ""
Write-Output "Cifrado: $Entrada -> $Salida  ($kb KB)"
Write-Output "Lo pueden abrir: $(($usuarios | ForEach-Object { $_.id }) -join ', ')"
Write-Output "Ese archivo si se puede subir. $Entrada no."
Write-Output "Si cambias una contrasena de acceso, vuelve a ejecutar esto."

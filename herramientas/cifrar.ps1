# Cifra data/local.js en data/vault.js
#
# El repositorio guarda solo el resultado cifrado. La contrasena no
# se guarda en ningun sitio: la escribes al abrir la web y la clave
# se deriva en tu navegador.
#
#   AES-256-CBC con PBKDF2-SHA256 (200.000 iteraciones)
#   HMAC-SHA256 sobre iv+cifrado, verificado antes de descifrar
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

# --- contrasena ---
$sec = Read-Host -AsSecureString "Contrasena para cifrar (la necesitaras en la web)"
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
$pass = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
if ([string]::IsNullOrWhiteSpace($pass)) { Write-Output "Contrasena vacia, cancelado"; exit 1 }

$sec2 = Read-Host -AsSecureString "Repitela"
$bstr2 = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec2)
$pass2 = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr2)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr2)
if ($pass -ne $pass2) { Write-Output "No coinciden, cancelado"; exit 1 }

# --- material ---
$texto = [System.IO.File]::ReadAllText($Entrada, (New-Object System.Text.UTF8Encoding $false))
$plano = [System.Text.Encoding]::UTF8.GetBytes($texto)

$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$salt = New-Object byte[] 16; $rng.GetBytes($salt)
$iv   = New-Object byte[] 16; $rng.GetBytes($iv)

# --- derivacion: 64 bytes = 32 de cifrado + 32 de firma ---
$kdf = New-Object System.Security.Cryptography.Rfc2898DeriveBytes(
  $pass, $salt, $Iteraciones, [System.Security.Cryptography.HashAlgorithmName]::SHA256)
$km = $kdf.GetBytes(64)
$kEnc = $km[0..31]
$kMac = $km[32..63]

# --- cifrado ---
$aes = [System.Security.Cryptography.Aes]::Create()
$aes.KeySize = 256; $aes.Mode = 'CBC'; $aes.Padding = 'PKCS7'
$aes.Key = $kEnc; $aes.IV = $iv
$enc = $aes.CreateEncryptor()
$cifrado = $enc.TransformFinalBlock($plano, 0, $plano.Length)
$enc.Dispose(); $aes.Dispose()

# --- firma sobre iv+cifrado (encrypt-then-MAC) ---
$firmado = New-Object byte[] ($iv.Length + $cifrado.Length)
[Array]::Copy($iv, 0, $firmado, 0, $iv.Length)
[Array]::Copy($cifrado, 0, $firmado, $iv.Length, $cifrado.Length)
$hmac = New-Object System.Security.Cryptography.HMACSHA256(,[byte[]]$kMac)
$mac = $hmac.ComputeHash($firmado)
$hmac.Dispose()

function B64($b) { [Convert]::ToBase64String([byte[]]$b) }

$js = @"
/* =========================================================
   Contenido local CIFRADO

   Aqui no hay nada legible. Es data/local.js cifrado con
   AES-256-CBC, clave derivada por PBKDF2-SHA256 con
   $Iteraciones iteraciones, y firmado con HMAC-SHA256.

   La contrasena NO esta en este archivo ni en el repositorio:
   se pide al abrir la web y la clave se deriva en el navegador.
   Sin ella esto es ruido.

   Regenerar:  powershell -ExecutionPolicy Bypass -File herramientas/cifrar.ps1
   ========================================================= */

window.REGISTER_VAULT({
  v: 1,
  kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: $Iteraciones,
         salt: '$(B64 $salt)' },
  cipher: 'AES-CBC',
  iv:   '$(B64 $iv)',
  mac:  '$(B64 $mac)',
  data: '$(B64 $cifrado)'
});
"@

[System.IO.File]::WriteAllText($Salida, $js, (New-Object System.Text.UTF8Encoding $false))

$kb = [math]::Round((Get-Item $Salida).Length/1KB,1)
Write-Output ""
Write-Output "Cifrado: $Entrada -> $Salida  ($kb KB)"
Write-Output "Ese archivo si se puede subir. data/local.js no."
Write-Output "Apuntate la contrasena: sin ella no hay forma de recuperarlo."

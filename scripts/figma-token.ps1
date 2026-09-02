<#
  Guarda tu token personal de Figma en ~/.figma-token sin que pase por el chat.

  Uso:  powershell -ExecutionPolicy Bypass -File scripts/figma-token.ps1

  Puedes copiar el token en Figma ANTES de lanzar esto (se queda en el portapapeles),
  o lanzarlo primero y copiarlo despues: espera hasta 10 minutos.

  El token se usa siempre leyendolo en linea, nunca imprimiendolo:
    curl -s -H "X-Figma-Token: $(cat ~/.figma-token)" https://api.figma.com/v1/...
#>
$ErrorActionPreference = 'Stop'
$dest = Join-Path $HOME '.figma-token'

if (Test-Path $dest) {
    Write-Host "Ya existe $dest. Borralo primero si quieres reemplazarlo."
    exit 1
}

$maxSeconds = 600
Write-Host "Esperando el token (hasta 10 min). Copialo en Figma con Ctrl+C."
for ($i = 1; $i -le $maxSeconds; $i++) {
    $v = Get-Clipboard -Raw
    if ($null -ne $v) { $v = ($v -replace "`r|`n", '').Trim() }
    if ($v -and $v.StartsWith('figd_')) {
        [IO.File]::WriteAllText($dest, $v, (New-Object Text.UTF8Encoding $false))

        # Solo el usuario actual puede leerlo
        $acl = Get-Acl $dest
        $acl.SetAccessRuleProtection($true, $false)
        foreach ($r in @($acl.Access)) { [void]$acl.RemoveAccessRule($r) }
        $me = [Security.Principal.WindowsIdentity]::GetCurrent().Name
        $acl.SetAccessRule(
            (New-Object Security.AccessControl.FileSystemAccessRule(
                $me, 'FullControl', 'Allow')))
        Set-Acl -Path $dest -AclObject $acl

        Write-Host ""
        Write-Host "OK: guardado en $dest ($($v.Length) caracteres)."
        exit 0
    }
    if ($i % 15 -eq 0) { Write-Host -NoNewline "." }
    Start-Sleep -Seconds 1
}
Write-Host ""
Write-Host "Se agoto la espera sin ver nada que empiece por figd_."
exit 1

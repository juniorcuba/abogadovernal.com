<#
  Guarda tu clave de API de Render en ~/.render-token sin que pase por el chat.

  Uso:  powershell -ExecutionPolicy Bypass -File scripts/render-token.ps1

  Copia la clave en Render ANTES de lanzar esto (se queda en el portapapeles),
  o lanzalo primero y copiala despues: espera hasta 10 minutos.

  La clave se usa siempre leyendola en linea, nunca imprimiendola:
    curl -s -H "Authorization: Bearer $(cat ~/.render-token)" https://api.render.com/v1/...

  Mismo patron que scripts/figma-token.ps1.
#>
$ErrorActionPreference = 'Stop'
$dest = Join-Path $HOME '.render-token'

if (Test-Path $dest) {
    Write-Host "Ya existe $dest. Borralo primero si quieres reemplazarlo."
    exit 1
}

$maxSeconds = 600
Write-Host "Esperando la clave de Render (hasta 10 min). Copiala con Ctrl+C."
Write-Host "Las claves de Render empiezan por 'rnd_'."
for ($i = 1; $i -le $maxSeconds; $i++) {
    $v = Get-Clipboard -Raw
    if ($null -ne $v) { $v = ($v -replace "`r|`n", '').Trim() }
    if ($v -and $v.StartsWith('rnd_')) {
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
        Write-Host "OK: guardada en $dest ($($v.Length) caracteres)."
        exit 0
    }
    if ($i % 15 -eq 0) { Write-Host -NoNewline "." }
    Start-Sleep -Seconds 1
}
Write-Host ""
Write-Host "Se agoto la espera sin ver nada que empiece por rnd_."
exit 1

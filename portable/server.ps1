# Sushiventure Idle Tycoon — servidor local sem dependências (PowerShell nativo do Windows).
# Serve a pasta www/ em http://localhost:PORTA e abre o navegador.
$ErrorActionPreference = 'Stop'
$wwwRoot = Join-Path $PSScriptRoot 'www'

if (-not (Test-Path $wwwRoot)) {
    Write-Host "ERRO: pasta www/ nao encontrada ao lado deste script." -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}

# escolhe uma porta livre
$port = 8080
$listener = $null
foreach ($p in 8080..8090) {
    try {
        $l = New-Object System.Net.HttpListener
        $l.Prefixes.Add("http://localhost:$p/")
        $l.Start()
        $listener = $l
        $port = $p
        break
    } catch { }
}
if (-not $listener) {
    Write-Host "ERRO: nao foi possivel abrir uma porta localhost (8080-8090)." -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}

$types = @{
    '.html' = 'text/html; charset=utf-8'
    '.htm'  = 'text/html; charset=utf-8'
    '.js'   = 'application/javascript'
    '.mjs'  = 'application/javascript'
    '.css'  = 'text/css'
    '.json' = 'application/json'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
    '.ttf'  = 'font/ttf'
    '.map'  = 'application/json'
}

Write-Host ""
Write-Host "  SUSHIVENTURE IDLE TYCOON" -ForegroundColor Yellow
Write-Host "  Servindo em: http://localhost:$port/" -ForegroundColor Green
Write-Host "  Mantenha esta janela aberta. Feche-a para parar o jogo." -ForegroundColor Gray
Write-Host ""

Start-Process "http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response
        $urlPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
        if ($urlPath -eq '') { $urlPath = 'index.html' }
        $full = [System.IO.Path]::GetFullPath((Join-Path $wwwRoot $urlPath))
        if (-not $full.StartsWith([System.IO.Path]::GetFullPath($wwwRoot))) {
            $res.StatusCode = 403; $res.Close(); continue
        }
        if (-not (Test-Path $full -PathType Leaf)) {
            $res.StatusCode = 404; $res.Close(); continue
        }
        $ext = [System.IO.Path]::GetExtension($full).ToLower()
        $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
        $bytes = [System.IO.File]::ReadAllBytes($full)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        $res.Close()
    }
} finally {
    $listener.Stop()
}

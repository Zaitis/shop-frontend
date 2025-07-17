Write-Host "Starting Angular development server with remote backend configuration..." -ForegroundColor Green
Write-Host ""
Write-Host "Connecting to: https://shop-backend.zaitis.dev" -ForegroundColor Yellow
Write-Host ""
ng serve --proxy-config proxy.config.json 
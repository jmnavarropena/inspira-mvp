# 🚀 Script de instalación rápida para Inspira
# Ejecuta este script cuando tengas Node.js instalado

Write-Host "🚀 Iniciando configuración de Inspira..." -ForegroundColor Cyan

# Verificar Node.js
Write-Host "📋 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instálalo primero." -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

# Verificar configuración
Write-Host "🔧 Verificando configuración..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivo .env no encontrado. Copiando desde .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
}

# Mostrar comandos disponibles
Write-Host ""
Write-Host "🎉 ¡Instalación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Comandos disponibles:" -ForegroundColor Cyan
Write-Host "  npm run dev      - Iniciar servidor de desarrollo" -ForegroundColor White
Write-Host "  npm run build    - Compilar para producción" -ForegroundColor White
Write-Host "  npm run lint     - Ejecutar linter" -ForegroundColor White
Write-Host "  npm run preview  - Vista previa de la build" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Para iniciar el desarrollo:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 El proyecto estará disponible en: http://localhost:5173" -ForegroundColor Cyan

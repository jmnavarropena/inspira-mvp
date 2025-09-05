# Script para instalar dependencias faltantes
Write-Host "Instalando @tailwindcss/forms..." -ForegroundColor Yellow

try {
    npm install @tailwindcss/forms
    Write-Host "✅ @tailwindcss/forms instalado correctamente" -ForegroundColor Green
    
    Write-Host "Actualizando tailwind.config.js..." -ForegroundColor Yellow
    
    # Leer el archivo actual
    $configContent = Get-Content "tailwind.config.js" -Raw
    
    # Reemplazar la línea comentada
    $updatedContent = $configContent -replace "    // require\('@tailwindcss/forms'\), // Temporalmente comentado", "    require('@tailwindcss/forms'),"
    
    # Escribir el archivo actualizado
    Set-Content "tailwind.config.js" $updatedContent
    
    Write-Host "✅ Configuración de Tailwind actualizada" -ForegroundColor Green
    Write-Host "🚀 ¡Listo! El proyecto ahora tiene soporte completo para formularios." -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error al instalar el paquete: $($_.Exception.Message)" -ForegroundColor Red
}

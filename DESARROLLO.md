# 🛠️ Guía de Desarrollo Local - Inspira

## 🚀 Inicio Rápido (cuando tengas Node.js)

### 1. Ejecutar script de instalación

```powershell
.\setup.ps1
```

### 2. O manualmente:

```powershell
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## 🔧 Configuración Actual

### Extensiones de VS Code Instaladas ✅

- ✅ **TypeScript and JavaScript Language Features** - Soporte completo para TS/JS
- ✅ **Tailwind CSS IntelliSense** - Autocompletado para clases de Tailwind
- ✅ **Prettier** - Formateo automático de código
- ✅ **ESLint** - Detección de errores y buenas prácticas
- ✅ **GitHub Copilot** - Asistente de IA para código
- ✅ **Auto Rename Tag** - Renombrado automático de etiquetas HTML
- ✅ **Path Intellisense** - Autocompletado de rutas de archivos
- ✅ **ES7+ React Snippets** - Snippets para React

### Configuración de VS Code ✅

- ✅ Formateo automático al guardar
- ✅ ESLint configurado
- ✅ Prettier como formateador por defecto
- ✅ IntelliSense para Tailwind CSS

## 📁 Estructura del Proyecto

```
Inspira/
├── public/                 # Archivos estáticos
│   ├── logo_cl_grupo.png
│   ├── logo_globo_bg.png
│   └── logo_inspira2.png
├── src/
│   ├── components/         # Componentes React
│   │   ├── Auth/          # Autenticación
│   │   └── Layout/        # Layout y navegación
│   ├── contexts/          # Contextos de React
│   ├── lib/               # Configuraciones (Supabase)
│   ├── pages/             # Páginas principales
│   └── types/             # Tipos TypeScript
├── .env                   # Variables de entorno (local)
├── .env.example          # Plantilla de variables
├── package.json          # Dependencias del proyecto
├── tailwind.config.js    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
├── vite.config.ts        # Configuración de Vite
└── setup.ps1             # Script de instalación
```

## 🎯 Tecnologías del Proyecto

### Frontend

- **React 18** con TypeScript
- **Vite** como bundler y dev server
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Lucide React** para iconos
- **Chart.js** para gráficos

### Backend/Base de Datos

- **Supabase** (PostgreSQL + Auth + Storage)
- Preparado para migrar a **Azure SQL Server**

### Herramientas de Desarrollo

- **ESLint** para linting
- **Prettier** para formateo
- **TypeScript** para type safety
- **PostCSS** + **Autoprefixer**

## 🚀 Comandos Disponibles

```powershell
# Desarrollo
npm run dev          # Servidor de desarrollo (http://localhost:5173)
npm run build        # Compilar para producción
npm run preview      # Vista previa de la build de producción
npm run lint         # Ejecutar ESLint

# Utilidades
npm install          # Instalar/actualizar dependencias
npm run lint --fix   # Corregir automáticamente errores de lint
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno (.env)

El archivo `.env` ya está configurado para desarrollo local con:

- Configuración de Supabase (demo)
- Logos del proyecto
- Configuración de archivos
- Modo demo habilitado

### Autenticación

Actualmente usa **autenticación simulada** que permite:

- Login con cualquier email/contraseña
- Roles predefinidos (Usuario, Responsable, CoDir, Admin)
- Persistencia en localStorage

## 🎨 Guía de Estilos

### Colores Principales

- **Primario**: `#1BADFA` (Azul Inspira)
- **Secundario**: `#1f2937` (Gris oscuro)
- **Éxito**: `#10b981`
- **Advertencia**: `#f59e0b`
- **Error**: `#ef4444`

### Componentes Tailwind Personalizados

Ver `tailwind.config.js` para configuración personalizada.

## 📱 Responsive Design

El proyecto está optimizado para:

- 📱 **Mobile**: 320px - 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

## 🤖 Desarrollo con GitHub Copilot

### Consejos para usar Copilot efectivamente:

1. **Comentarios descriptivos**: Escribe comentarios claros sobre lo que quieres hacer
2. **Nombres descriptivos**: Usa nombres de variables y funciones descriptivos
3. **Tipos TypeScript**: Define tipos claros para mejor contexto
4. **Patrones consistentes**: Sigue los patrones establecidos en el código

### Ejemplos de prompts efectivos:

```typescript
// TODO: Crear componente para mostrar tarjeta de idea con título, descripción y estado
// TODO: Implementar función para cambiar estado de idea usando Supabase
// TODO: Crear hook personalizado para gestionar autenticación
```

## 🔄 Flujo de Trabajo

### 1. Desarrollo de Feature

1. Crear nueva rama: `git checkout -b feature/nueva-funcionalidad`
2. Desarrollar con ayuda de Copilot
3. Probar localmente: `npm run dev`
4. Lint y formateo: `npm run lint`
5. Commit y push

### 2. Estructura de Commits

```
feat: agregar gestión de ideas
fix: corregir error en autenticación
docs: actualizar README
style: aplicar formateo con Prettier
refactor: reorganizar componentes
```

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"

- **Causa**: Node.js no está instalado
- **Solución**: Instalar Node.js y reiniciar VS Code

### Error de permisos en Windows

- **Causa**: Política de ejecución de PowerShell
- **Solución**: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Error de dependencias

- **Solución**: Borrar `node_modules` y ejecutar `npm install`

### Puerto ocupado

- **Solución**: Cambiar puerto en `vite.config.ts` o cerrar proceso en puerto 5173

## 📞 Soporte

- **Documentación**: Este archivo y comentarios en código
- **GitHub Copilot**: Para sugerencias de código
- **Comunidad**: Stack Overflow, documentación oficial de React/Vite

---

💡 **Tip**: Mantén este archivo actualizado cuando agregues nuevas funcionalidades o configuraciones.

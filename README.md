# 🚀 Inspira - Sistema de Gestión de Ideas

**"Tu idea puede cambiar el futuro"**

Sistema de gestión de ideas para CL Grupo Industrial, diseñado para fomentar la innovación y capturar las mejores propuestas de todos los empleados.

## 📋 Descripción

Inspira es una plataforma web moderna que permite a los empleados de CL Grupo Industrial:

- ✨ **Proponer ideas innovadoras** con un flujo de trabajo estructurado
- 🔄 **Gestionar el ciclo de vida** de las ideas desde la propuesta hasta la implementación
- 🏆 **Participar en campañas** temáticas de innovación
- 📊 **Visualizar rankings** y obtener reconocimiento por contribuciones
- 👥 **Colaborar** en un entorno corporativo seguro

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript para una interfaz moderna y type-safe
- **Tailwind CSS** para diseño responsive y consistente
- **Lucide React** para iconografía moderna
- **Chart.js** para visualizaciones de datos
- **Vite** como bundler para desarrollo rápido

### Backend & Base de Datos
- **Supabase** como backend-as-a-service (preparado para migrar a Azure SQL)
- **PostgreSQL** como base de datos principal
- **Autenticación** simulada para Microsoft/Azure AD

### Herramientas de Desarrollo
- **VS Code** con GitHub Copilot para desarrollo asistido por IA
- **ESLint** y **Prettier** para calidad de código
- **TypeScript** para type safety

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: #1BADFA (Azul Inspira)
- **Secundario**: Gris oscuro (#1f2937)
- **Acentos**: Gradientes y tonos complementarios

### Características de Diseño
- 📱 **Responsive Design** - Optimizado para PC, tablets y smartphones
- 🎭 **Interfaz en Español** - Completamente localizada
- ⚡ **Animaciones Suaves** - Micro-interacciones para mejor UX
- 🎯 **Navegación Intuitiva** - Adaptada según roles de usuario

## 👥 Roles y Permisos

### 🔵 Usuario
- Crear y gestionar sus propias ideas
- Participar en campañas activas
- Ver rankings y badges personales

### 🟡 Responsable
- Todas las funciones de Usuario
- Gestionar ideas en tablero Kanban
- Mover ideas entre estados del flujo de trabajo
- Crear y gestionar campañas

### 🟠 CoDir (Comité de Dirección)
- Todas las funciones de Usuario
- Votar en ideas que requieren aprobación
- Evaluar propuestas en estado "Evalúa CoDir"

### 🔴 Admin
- Acceso completo a todas las funcionalidades
- Gestión de usuarios y configuración del sistema
- Reportes y analytics avanzados

## 🔄 Flujo de Trabajo de Ideas

```
Abierta → En Revisión → Evalúa CoDir → Aprobada → En Progreso → Implementada
    ↓         ↓            ↓
  Rechazada  Rechazada   Rechazada
```

### Estados Detallados:
1. **Abierta** - Idea recién creada, editable por el autor
2. **En Revisión** - Bajo evaluación del Responsable
3. **Evalúa CoDir** - Requiere votación del Comité de Dirección
4. **Aprobada** - Aprobada para implementación
5. **En Progreso** - En proceso de implementación
6. **Implementada** - Completamente implementada
7. **Rechazada** - No aprobada (con razón documentada)

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- VS Code (recomendado)
- GitHub Copilot (opcional pero recomendado)

### Configuración Local

1. **Clonar el repositorio**
```bash
git clone [repository-url]
cd inspira
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar desarrollo**
```bash
npm run dev
```

5. **Abrir en VS Code**
```bash
code .
```

### 🤖 Desarrollo con GitHub Copilot

Este proyecto está optimizado para trabajar con GitHub Copilot:

- **Estructura modular** para sugerencias precisas
- **Tipos TypeScript completos** para mejor contexto
- **Comentarios descriptivos** para guiar a Copilot
- **Patrones consistentes** para predicciones mejoradas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Layout/         # Layout y navegación
│   ├── Ideas/          # Componentes de gestión de ideas
│   ├── Campaigns/      # Componentes de campañas
│   └── Common/         # Componentes comunes
├── contexts/           # Contextos de React
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── pages/              # Páginas principales
├── types/              # Definiciones de TypeScript
└── utils/              # Funciones utilitarias
```

## 🔧 Configuración para Producción

### Azure SQL Server
Para migrar a Azure SQL Server:

1. **Configurar connection string**
```javascript
const azureConfig = {
  server: 'your-server.database.windows.net',
  database: 'InspiraDB',
  authentication: {
    type: 'azure-active-directory-default'
  }
};
```

2. **Configurar Entity Framework** (para versión .NET)
3. **Migrar esquema de base de datos**
4. **Configurar Azure AD authentication**

### Microsoft Authentication
Para habilitar autenticación real de Microsoft:

1. **Registrar aplicación en Azure AD**
2. **Configurar redirect URIs**
3. **Actualizar configuración de auth**
4. **Implementar flujo OAuth2/OIDC**

## 🎯 Funcionalidades Principales

### ✅ Implementadas
- [x] Sistema de autenticación simulado
- [x] Dashboard con KPIs y gráficos
- [x] Navegación adaptativa por roles
- [x] Diseño responsive completo
- [x] Estructura de base de datos
- [x] Contextos y tipos TypeScript

### 🚧 En Desarrollo (con GitHub Copilot)
- [ ] Gestión completa de ideas (CRUD)
- [ ] Tablero Kanban con drag-and-drop
- [ ] Sistema de campañas
- [ ] Módulo de votación para CoDir
- [ ] Rankings y gamificación
- [ ] Gestión de archivos adjuntos
- [ ] Notificaciones y alertas

### 🔮 Futuras Mejoras
- [ ] Integración real con Azure AD
- [ ] Conexión a Azure SQL Server
- [ ] Sistema de notificaciones por email
- [ ] Analytics avanzados
- [ ] API REST completa
- [ ] Tests automatizados
- [ ] PWA (Progressive Web App)

## 🤝 Contribución

### Flujo de Desarrollo
1. Crear branch para nueva funcionalidad
2. Desarrollar con ayuda de GitHub Copilot
3. Seguir patrones establecidos
4. Documentar cambios importantes
5. Crear pull request

### Estándares de Código
- **TypeScript** para type safety
- **ESLint** para linting
- **Prettier** para formateo
- **Conventional Commits** para mensajes

## 📊 Migración a ASP.NET Core

Este proyecto está diseñado para facilitar la migración a ASP.NET Core:

### Equivalencias Tecnológicas
- **React Components** → **Razor Views/Components**
- **TypeScript Types** → **C# Models/DTOs**
- **Supabase** → **Entity Framework Core + Azure SQL**
- **Context API** → **Dependency Injection**

### Pasos de Migración
1. **Crear proyecto ASP.NET Core MVC**
2. **Configurar Entity Framework Core**
3. **Implementar modelos de datos**
4. **Crear controladores MVC**
5. **Migrar vistas a Razor**
6. **Configurar Azure AD**
7. **Implementar servicios de negocio**

## 📞 Soporte

Para soporte técnico o preguntas sobre el desarrollo:

- **Documentación**: Ver README y comentarios en código
- **Issues**: Crear issue en el repositorio
- **GitHub Copilot**: Usar para sugerencias de código

## 📄 Licencia

© 2024 CL Grupo Industrial. Todos los derechos reservados.

---

**Inspira** - Donde las ideas se convierten en innovación 🚀

*Desarrollado con ❤️ y GitHub Copilot para CL Grupo Industrial*
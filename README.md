# Dashboard MFE - React 19 + Vite

Microfrontend de Dashboard construido con **React 19** y **Vite** usando Module Federation.

## 🚀 Tecnologías

- **React 19** - Última versión con nuevas características
- **Vite 6** - Build tool ultra rápido
- **TypeScript** - Tipado estático
- **Module Federation** - Arquitectura de microfrontends
- **@originjs/vite-plugin-federation** - Plugin oficial para Vite

## 📦 Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

El MFE estará disponible en `http://localhost:3000`

### 3. Construir para producción
```bash
npm run build
```

## 🏗️ Arquitectura Module Federation

### Configuración (vite.config.ts)
```typescript
federation({
  name: 'dashboard_mfe',
  filename: 'remoteEntry.js',
  exposes: {
    './Dashboard': './src/Dashboard.tsx'
  },
  shared: ['react', 'react-dom']
})
```

### Componentes Expuestos
- `./Dashboard` - Componente principal del dashboard

## 🔗 Integración con Shell Angular

Este MFE está diseñado para ser consumido por el Shell Angular:

```typescript
// En el shell Angular
const DashboardModule = await import('dashboard_mfe/Dashboard');
const Dashboard = DashboardModule.default;
```

### Props que recibe del Shell
```typescript
interface DashboardProps {
  userInfo?: {
    name: string;
    role: string;
  };
  shellData?: any;
}
```

## 🔧 Desarrollo

### Scripts disponibles
- `npm run dev` - Desarrollo con hot reload
- `npm run build` - Build para producción  
- `npm run preview` - Preview del build
- `npm run lint` - Linting

### Puertos
- **Desarrollo**: `http://localhost:3000`
- **Producción**: Configurable en el shell

## 🌐 URLs importantes

- **RemoteEntry**: `http://localhost:3000/remoteEntry.js`
- **Dashboard**: `http://localhost:3000` (standalone)

## 🚨 Resolución de Problemas

### Error: "Failed to fetch dynamically imported module"
**Causa**: El MFE no está ejecutándose
**Solución**: `npm run dev`

### Error de CORS
**Causa**: Configuración de CORS
**Solución**: Verificar `cors: true` en vite.config.ts

### Error: "Cannot resolve './Dashboard'"
**Causa**: El componente no está siendo expuesto correctamente
**Solución**: Verificar `exposes` en vite.config.ts

## 📝 Estructura del Proyecto

```
dashboard-mfe/
├── src/
│   ├── Dashboard.tsx     ← Componente principal expuesto
│   ├── App.tsx          ← App standalone (para desarrollo)
│   └── main.tsx         ← Entry point
├── vite.config.ts       ← Configuración Module Federation
└── package.json
```

## 🔗 Enlaces Relacionados

- [Shell Angular](../shell-app/)
- [Vite Module Federation](https://github.com/originjs/vite-plugin-federation)
- [React 19 Docs](https://react.dev/)

---

**Puerto**: 3000 | **Tipo**: Remote MFE | **Framework**: React 19 + Vite

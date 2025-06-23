# 🔥 Configuración de Firebase con Variables de Entorno

## 📋 Pasos para configurar Firebase Authentication

### 1. Configurar Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Authentication** > **Sign-in method** > **Google**
4. En **Project Settings** > **General**, agrega una app web
5. Copia la configuración de Firebase

### 2. Configurar Variables de Entorno

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env` con tus credenciales reales:**
   ```bash
   # Firebase Configuration para Development
   FIREBASE_API_KEY=AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXx
   FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   FIREBASE_PROJECT_ID=tu-proyecto-id
   FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789012
   FIREBASE_APP_ID=1:123456789012:web:abcd1234567890
   ```

3. **Para producción (opcional), agrega las variables con sufijo `_PROD`:**
   ```bash
   FIREBASE_API_KEY_PROD=tu-api-key-produccion
   FIREBASE_AUTH_DOMAIN_PROD=tu-proyecto-prod.firebaseapp.com
   # ... resto de variables con _PROD
   ```

### 3. Configurar Dominios Autorizados

En Firebase Console > Authentication > Settings > Authorized domains:
- Agrega `localhost` para desarrollo
- Agrega tu dominio de producción

### 4. Ejecutar la aplicación

```bash
# Esto generará automáticamente los archivos de environment
npm start
```

## 🔒 Seguridad

- ✅ El archivo `.env` está en `.gitignore`
- ✅ Las credenciales no están en el código fuente
- ✅ Se generan automáticamente los archivos de environment

## 🛠️ Scripts Disponibles

- `npm run config:env` - Genera archivos de environment desde .env
- `npm start` - Genera config y ejecuta desarrollo
- `npm run build` - Genera config y construye para desarrollo
- `npm run build:prod` - Genera config y construye para producción

## 🌐 Uso en MFEs (Microfrontends)

El estado de autenticación se comparte globalmente:

```javascript
// En tus MFEs React
useEffect(() => {
  // Escuchar cambios de autenticación
  const handleAuthChange = (event) => {
    const { user, isAuthenticated, userToken } = event.detail;
    // Actualizar estado del MFE
  };

  window.addEventListener('auth-state-changed', handleAuthChange);
  
  // Obtener estado actual
  const currentState = window.globalAppState;
  
  return () => {
    window.removeEventListener('auth-state-changed', handleAuthChange);
  };
}, []);
```

## ⚠️ Problemas Comunes

1. **Error "Missing environment variables":**
   - Verifica que el archivo `.env` existe
   - Verifica que todas las variables están definidas

2. **Firebase no inicializa:**
   - Verifica que las credenciales son correctas
   - Verifica que los dominios están autorizados en Firebase Console

3. **Login no funciona:**
   - Verifica que Google como proveedor está habilitado
   - Verifica que el dominio está autorizado 
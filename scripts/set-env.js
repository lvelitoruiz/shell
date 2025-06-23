const fs = require('fs');
const path = require('path');

// Cargar dotenv
require('dotenv').config();

// Función para generar el archivo de environment
function generateEnvironmentFile(isProduction = false) {
  const suffix = isProduction ? '_PROD' : '';
  
  const config = {
    production: isProduction,
    firebaseConfig: {
      apiKey: process.env[`FIREBASE_API_KEY${suffix}`] || process.env.FIREBASE_API_KEY || '',
      authDomain: process.env[`FIREBASE_AUTH_DOMAIN${suffix}`] || process.env.FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env[`FIREBASE_PROJECT_ID${suffix}`] || process.env.FIREBASE_PROJECT_ID || '',
      storageBucket: process.env[`FIREBASE_STORAGE_BUCKET${suffix}`] || process.env.FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env[`FIREBASE_MESSAGING_SENDER_ID${suffix}`] || process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env[`FIREBASE_APP_ID${suffix}`] || process.env.FIREBASE_APP_ID || ''
    }
  };

  const targetPath = isProduction ? 
    './src/environments/environment.prod.ts' : 
    './src/environments/environment.ts';

  const envConfigFile = `export const environment = ${JSON.stringify(config, null, 2)};
`;

  fs.writeFileSync(targetPath, envConfigFile);
  console.log(`✅ Environment file generated: ${targetPath}`);
}

// Verificar que las variables necesarias existan
const requiredVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Error: Las siguientes variables de entorno no están definidas:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\n💡 Asegúrate de tener un archivo .env con todas las variables necesarias.');
  process.exit(1);
}

// Generar archivos de environment
try {
  generateEnvironmentFile(false); // development
  generateEnvironmentFile(true);  // production
  console.log('🎉 Archivos de environment generados exitosamente!');
} catch (error) {
  console.error('❌ Error generando archivos:', error);
  process.exit(1);
} 
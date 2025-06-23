const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',

  remotes: {
    // Dashboard MFE - React + Vite (ruta corregida para assets)
    "mfeDashboard": process.env['NODE_ENV'] === 'production' 
      ? "https://your-dashboard-domain.com/assets/remoteEntry.js"
      : "http://localhost:5173/assets/remoteEntry.js"
  },

  shared: {
    ...shareAll({ 
      singleton: true, 
      strictVersion: false,
      requiredVersion: 'auto' 
    }),
    
    // Configuración específica para React (simplificada)
    'react': {
      singleton: true,
      strictVersion: false,
      requiredVersion: false
    },
    'react-dom': {
      singleton: true,
      strictVersion: false,
      requiredVersion: false
    }
  },

}, {
  // Configuración adicional de webpack
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "querystring": require.resolve("querystring-es3/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/")
    }
  },
  plugins: [
    new (require('webpack')).DefinePlugin({
      'import.meta': 'undefined',
      'import.meta.url': '"undefined"'
    }),
    new (require('webpack')).ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: /import\.meta/g,
            replace: '({})',
            flags: 'g'
          }
        }
      }
    ]
  }
});

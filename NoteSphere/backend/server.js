const { createProxyMiddleware } = require('http-proxy-middleware');

function setup(app) {
  // Middleware para redirigir solicitudes a /api al servidor JSON en el puerto 3002
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

  // Otros middlewares y configuraciones según sea necesario
}

module.exports = { setup };

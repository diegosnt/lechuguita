const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const envConfig = require('./config/env');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();

// Extraer dominio de la URL de la API para CSP
function getApiOrigin(apiUrl) {
  if (!apiUrl) return null;
  try {
    const url = new URL(apiUrl);
    return url.origin;
  } catch (error) {
    console.warn('URL de API inválida:', apiUrl);
    return null;
  }
}

// Construir lista de orígenes permitidos para connectSrc
const allowedConnections = ["'self'"];
if (envConfig.DOLAR_API_URL) {
  const dolarApiOrigin = getApiOrigin(envConfig.DOLAR_API_URL);
  if (dolarApiOrigin) allowedConnections.push(dolarApiOrigin);
}
if (envConfig.API1_ENDPOINT) {
  const api1Origin = getApiOrigin(envConfig.API1_ENDPOINT);
  if (api1Origin) allowedConnections.push(api1Origin);
}
if (envConfig.API2_ENDPOINT) {
  const api2Origin = getApiOrigin(envConfig.API2_ENDPOINT);
  if (api2Origin) allowedConnections.push(api2Origin);
}

// Security middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: allowedConnections,
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      workerSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: envConfig.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones por ventana
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Logging middleware
if (envConfig.NODE_ENV !== 'test') {
  app.use(morgan(envConfig.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static('public'));

// Rutas
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    message: 'La ruta solicitada no existe en este servidor',
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = envConfig.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(envConfig.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor gracefully...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT recibido. Cerrando servidor gracefully...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

// Iniciar servidor
const PORT = envConfig.PORT;
const server = app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`✓ Entorno: ${envConfig.NODE_ENV || 'development'}`);
  console.log(`✓ Presiona Ctrl+C para detener el servidor`);
});

module.exports = app; // Para testing

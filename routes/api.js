const express = require('express');
const router = express.Router();
const pkg = require('../package.json');
const { obtenerCotizaciones } = require('../services/tuServicio');

// Healthcheck endpoint - verifica que el servidor esté funcionando
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: pkg.version,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de información del proyecto
router.get('/info', (req, res) => {
  res.json({
    nombre: pkg.name,
    version: pkg.version,
    descripcion: pkg.description,
    mensaje: '¡API funcionando correctamente!'
  });
});

// Ruta para obtener todas las cotizaciones del dólar
router.get('/cotizaciones', async (req, res) => {
  try {
    const cotizaciones = await obtenerCotizaciones();
    res.json({
      success: true,
      data: cotizaciones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener las cotizaciones',
      error: error.message
    });
  }
});

module.exports = router;

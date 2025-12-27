const axios = require('axios');
const httpsAgent = require('../config/https');
const envConfig = require('../config/env');

const DOLAR_API_URL = envConfig.DOLAR_API_URL;

// Obtener todas las cotizaciones del dólar
const obtenerCotizaciones = async () => {
  try {
    const response = await axios.get(DOLAR_API_URL, {
      httpsAgent,
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error.message);
    throw error;
  }
};

module.exports = {
  obtenerCotizaciones
};

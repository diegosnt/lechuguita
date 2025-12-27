require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3003,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  API1_ENDPOINT: process.env.API1_ENDPOINT,
  API2_ENDPOINT: process.env.API2_ENDPOINT,
  API1_KEY: process.env.API1_KEY,
  API2_KEY: process.env.API2_KEY,
  REJECT_UNAUTHORIZED: process.env.REJECT_UNAUTHORIZED === 'true',
  DOLAR_API_URL: process.env.DOLAR_API_URL
};

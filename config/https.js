const https = require('https');
const envConfig = require('./env');

const httpsAgent = new https.Agent({
  rejectUnauthorized: envConfig.REJECT_UNAUTHORIZED
});

module.exports = httpsAgent;

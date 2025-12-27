const express = require('express');
const router = express.Router();
const { getHomePage } = require('../views/home');
const pkg = require('../package.json');
const envConfig = require('../config/env');

router.get('/', (req, res) => {
  const html = getHomePage(pkg.name, envConfig.DOLAR_API_URL);
  res.send(html);
});

module.exports = router;

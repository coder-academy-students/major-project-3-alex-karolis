const fs = require('fs');
const config = require('../config')

const caCert = fs.readFileSync('cacert')

const thinky = require('thinky')({
  authKey: config.authKey,
  host: 'aws-us-east-1-portal.5.dblayer.com',
  port: 11170,
  ssl: {
    ca: caCert
  }
});

module.exports = thinky;

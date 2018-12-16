const nconf = require('nconf');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();


nconf.argv()
    .env()
    .file('config', path.join(__dirname, 'config.json'))
    .file('keys', path.join(__dirname, 'keys.json'));

module.exports = nconf;

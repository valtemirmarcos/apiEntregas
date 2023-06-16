const express =require('express');
const cors = require('cors');
const bodyParser  = require('body-parser');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo');
const app = express();

module.exports = {
    cors:cors,
    bodyParser:bodyParser,
    app:app,
    express:express,
    moment:moment
}
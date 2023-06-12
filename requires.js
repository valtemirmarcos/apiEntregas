const express =require('express');
const cors = require('cors');
const bodyParser  = require('body-parser');
const app = express();

module.exports = {
    cors:cors,
    bodyParser:bodyParser,
    app:app,
    express:express
}
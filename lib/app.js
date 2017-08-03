const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());

const restaurant = require('./routes/restaurant');

app.use('/restaurants', restaurants);

app.use(errorHandler());

module.exports = app;
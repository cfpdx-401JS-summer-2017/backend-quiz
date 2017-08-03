const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const restaurants = require('./routes/restaurants');

app.use('/api/restaurants', restaurants);
app.use(errorHandler());

module.exports = app;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const errorHandler = require('./error-handler');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const restaurant = require('./routes/restaurants');

app.use('/restaurants', restaurant);

// app.use(errorHandler());

module.exports = app;

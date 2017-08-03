const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// const restaurants = require('./routes/restaurants');
const reviews = require('./routes/reviews');


// app.use('/restaurants', restaurants);
app.use('/api/reviews', reviews);
app.use(errorHandler());

module.exports = app;
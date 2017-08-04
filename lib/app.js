const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use(bodyParser.json());

const restaurants = require('./routes/restaurants.js');
const reviews = require('./routes/reviews.js');

app.use('/restaurants', restaurants);
app.use('/reviews', reviews);

app.use(errorHandler());

module.exports = app;
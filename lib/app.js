const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

const restaurants = require('./routes/restaurants');
const reviews = require('./routes/reviews');

app.use('/restaurants', restaurants);
app.use('/reviews', reviews);





app.use(errorHandler());

module.exports = app;
const express = require('express');
const app = express();

const restaurants = require('./routes/restaurants');
// const reviews = require('./routes/reviews');

app.use('/restaurants', restaurants);
// app.use('/reviews', reviews);

module.exports = app;
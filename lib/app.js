const express = require('express');
const app = express();

const restaurants = require('./routes/restaurants');

app.use('/restaurants', restaurants);

module.exports = app;
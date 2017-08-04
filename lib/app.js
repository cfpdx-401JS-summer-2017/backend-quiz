const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const restaurants = require('./routes/restaurant-routes');

app.use('/restaurant', restaurants);

module.exports = app;
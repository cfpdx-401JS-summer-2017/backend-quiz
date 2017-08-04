const express = require('express');
const app = express();
// const errorHandler = require('./error-handler');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// const auth = require('./routes/auth');
const reviews = require('./lib/routes/reviews');
const restaurants = require('./lib/routes/restaurants');

// app.use('/auth', auth);
app.use('/reviews', reviews );
app.use('/restaurants', restaurants);

// app.use(errorHandler());

module.exports = app;
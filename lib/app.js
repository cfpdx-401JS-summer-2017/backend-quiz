const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use(bodyParser.json());

// const reviews = require('./routes/reviews');

// app.use('/reviews', reviews);

app.use(errorHandler());

module.exports = app;
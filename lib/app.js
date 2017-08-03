const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Restaurant = require('./models/restaurant');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/restaurants', (req, res) => {
    new Restaurant(req.body)
        .save()
        .then(restaurant => res.send(restaurant))
        .catch(err => {
            console.log(err);
            res.status(500).send('something messed up');
        });
});

app.put('/restaurants/:id', (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(restaurant => res.send(restaurant))
        .catch(console.log);
});

app.get('/restaurants/:id', (req, res) => {
    Restaurant.findById(req.params.id)
        .lean()
        .then(restaurant => {
            res.send(restaurant);
        })
        .catch(console.log);
});

app.get('/restaurants', (req, res) => {
    Restaurant.find()
        .lean()
        .select('_id name cuisine')
        .then(restaurants => res.send(restaurants))
        .catch(console.log);
});

module.exports = app;
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router
    .post('/', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .get('/', (req, res) => {
        Restaurant.find()
            .then(restaurants => res.send(restaurants));
    });

module.exports = router;    

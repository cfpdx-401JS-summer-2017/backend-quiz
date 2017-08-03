const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router
    .post('/', (req, res, next) => {
        const restaurant = new Restaurant(req.body);

        restaurant
            .save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .get('/', (req, res) => {
        Restaurant.find()
            .select('_id name cuisine')
            .then(found => res.send(found));
    });

module.exports = router;    

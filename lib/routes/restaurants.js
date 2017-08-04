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

    .get('/', (req, res, next) => {
        Restaurant.find()
            .select('_id name cuisine')
            .then(found => res.send(found))
            .catch(next);
    })

    // GET to /restaurants/:id:
    .get('/:id', (req, res) => {
        Restaurant.findById(req.params.id)
            .lean()
            .then(restaurant => {
                if(!restaurant) res.status(404).send(`Cannot GET restaurant with ID:${req.params.id}`);
                else res.send(restaurant);
            });
    });
    
    
    // GET to /restaurants?cuisine=<name of cuisine>:

module.exports = router;    

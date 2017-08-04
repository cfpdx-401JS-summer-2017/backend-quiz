const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();

router
    .get('/:id', (req, res, next) => {
        Restaurant.findById(req.params.id)
            .lean()
            .then(restaurant => {
                if(!restaurant) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(restaurant);
            })
            .catch(next);
    })
    .get('/restaurants?cuisine=', (req, res, next) => {
        Restaurant.find(req.params.cuisine)
            .lean()
            .then(restaurant => {
                if(!restaurant) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(restaurant);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Restaurant.find()
            .lean()
            .select('name address cuisine __v')
            .then(restaurants => res.send(restaurants))
            .catch(next);

    })
    .use(jsonParser)
    
    .post('/', (req, res, next) =>{
        const restaurant = new Restaurant(req.body);
        restaurant
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    });


module.exports = router;
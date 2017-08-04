const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();
// const ensureAuth = require('../auth/ensure-auth')();

router
    .use(jsonParser)

    .post('/', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Restaurant.find()
            .lean()
            .select('name')
            .then(restaurants => res.send(restaurants))
            .catch(next);
    });



module.exports = router;
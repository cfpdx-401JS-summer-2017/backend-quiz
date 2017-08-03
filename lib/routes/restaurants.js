const express = require('express');
const router = express.Router();
const Album = require('../models/restaurant');
const jsonParser = require('body-parser').json();

router
.use(jsonParser)
    .get('/:id', (req, res, next) => {
        Album.findById(req.params.id)
            .lean()
            .then(restaurant => {
                if(!restaurant) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(restaurant);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        restaurant.find()
            .lean()
            .select('-createdAt -updatedAt')
            .then(restaurants => res.send(restaurants))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        restaurant.findByIdAndRemove(req.params.id)
            .then(() => res.send({ removed: true}))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true})
            .select('-createdAt -updatedAt -__v ')
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        restaurant.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true,
            runValidators: true
        })
            .then(restaurant => res.send(restaurant))
            .catch(next);
    });

module.exports = router;
const Router = require('express').Router;
const router = Router();
const Restaurant = require('../models/restaurant');

router
    .get('/', (req, res, next) => {
        Restaurant.find()
            .lean()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Restaurant.findById(req.params.id)
            .lean()
            .then(restaurant => {
                if (!restaurant) res.status(404).send(`cannot get ${req.params.id}`);
                else res.send(restaurant);
            })
            .catch(next);
    })

    // .get('/:cuisine', (req, res, next) => {
    //     Restaurant.find( { cuisine: { $cuisine } } )
    //         .lean()
    //         .then(restaurant => {
    //             if (!restaurant) res.status(404).send(`cannot get ${req.params.cuisine}`);
    //             else res.send(restaurant);
    //         })
    //         .catch(next);
    // })

    .post('/', (req, res, next) => {
        new Restaurant(req.body)
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    });

module.exports = router;
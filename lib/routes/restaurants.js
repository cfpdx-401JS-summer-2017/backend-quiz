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

    // .get('/:id?cuisine', (req, res, next) => {
    //     Restaurant.findById(req.params.id)
    //         .lean()
    //         .then(restaurant => {
    //             if(!restaurant) res.status(404).send(`cannot get ${req.params.id}`);
    //             else res.send(restaurant);
    //         })
    //         .catch(next);
    // })

    .post('/', (req, res, next) => {
        console.log('RESTAURANT IS...',req.body);
        new Restaurant(req.body)
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Restaurant.findByIdAndRemove(req.params.id)
            .then(response => res.send({ removed: !!response }))
            .catch(next);
    });

module.exports = router;
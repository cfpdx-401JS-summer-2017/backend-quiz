const Router = require('express').Router;
const router = Router();
const Review = require('../models/review');

router
    .get('/', (req, res, next) => {
        Review.find()
            .lean()
            .then(review => res.send(review))
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        Review.findById(req.params.id)
            .lean()
            .then(review => {
                if (!review) res.status(404).send(`cannot get ${req.params.id}`);
                else res.send(review);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Review(req.body)
            .save()
            .then(review => res.send(review))
            .catch(next);
    });

module.exports = router;
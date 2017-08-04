const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const jsonParser = require('body-parser').json();

router
    .get('/:id', (req, res, next) => {
        Review.findById(req.params.id)
            .lean()
            .then(review => {
                if(!review) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(review);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Review.find()
            .lean()
            .select('name address cuisine __v')
            .then(reviews => res.send(reviews))
            .catch(next);

    })
    .use(jsonParser)
    
    .post('/', (req, res, next) =>{
        const review = new Review(req.body);
        review
            .save()
            .then(review => res.send(review))
            .catch(next);
    });
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const jsonParser = require('body-parser').json();

router
    .post('/', jsonParser, (req, res, next) => {
        const review = new Review(req.body);
        review  
            .save()
            .then(review => res.send(review))
            .catch(next);
    });

module.exports = router;
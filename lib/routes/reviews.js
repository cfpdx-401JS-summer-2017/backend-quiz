const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser)

    .get('/', (req, res, next) => {
        Review.find()
            .lean()
            .select('comment')
            .then(reviews => res.send(reviews))
            .catch(next);
    });



module.exports = router;
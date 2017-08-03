const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();
// const ensureAuth = require('../auth/ensure-auth')();

router
    .use(jsonParser)

    .get('/', (req, res, next) => {
        Restaurant.find()
            .lean()
            .select('name')
            .then(restaurants => res.send(restaurants))
            .catch(next);
    });



module.exports = router;
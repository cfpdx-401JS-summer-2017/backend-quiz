const Router = require('express').Router;
const router = Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();

router
    .user(jsonParser)
    .post('/', (req, res, next) => {

    });

module.exports = router;
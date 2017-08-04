const connection = require('mongoose')
    .connection;
const testHelper = require('./test-helper');

before(() => {
    connection
    connection.dropDatabase();

    // let testRestaurant = testHelper.studio;
    // let testReview = testHelper.actor;

    // return Promise.all([
    //     testHelper.saveRestaurant(testRestaurant)
    //     .then(restaurant => testRestaurant = restaurant),
    //     testHelper.saveReview(testReview)
    //     .then(review => testReview = review)
    // ])
});

beforeEach(() =>{
    connection.dropDatabase();
})
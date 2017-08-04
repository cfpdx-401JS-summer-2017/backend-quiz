const app = require('../../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);

module.exports = {

    restaurant: {
        name: 'Food Coma',
        address: {
            street: 'Main Street',
            city: 'Any City'
        },
        cuisine: 'other',
        reviews: []
    },

    review: {
        rating: 5,
        comments: 'Our waiter...was determined to gaslight us into thinking we were having a good time. “Trump gets the taco bowl and the lasagna and baked ziti,” he said, before subsequently informing the table that we could not order the lasagna or baked ziti.@@@@@@@',
        email: 'LOWERCASE@GMAIL.COM'
    },
    saveRestaurant(testRestaurant) {
        return request.post('/restaurant')
            .send(testRestaurant)
            .then(({ body }) => {
                console.log('rest: ',body);
                // testRestaurant._id = body._id;
                // testRestaurant.__v = body.__v;
                return testRestaurant;
            })
    },
    saveReview(testReview) {
        return request.post('/')
            .send(testReview)
            .then(({ body }) => {
                console.log('rev: ',body);
                // testReview._id = body._id;
                // testReview.__v = body.__v;
                return testReview;
            })
    }
}
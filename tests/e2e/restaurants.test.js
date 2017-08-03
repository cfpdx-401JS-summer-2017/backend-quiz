const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGO_URI = 'mongodb://localhost:27017/restaurants-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('restaurant API', () => {
    before(() => connection.dropDatabase());

    const deschutes = {
        name: 'deschutes',
        cuisine: 'northwest',
        reviews: [
            {
                rating: 3,
                comments: 'beer was pretty good',
                email: 'meryl@meryl.com'
            },
            {
                rating: 5,
                comments: 'beer was amazing',
                email: 'girl@girl.com'
            },
            {
                rating: 1,
                comments: 'beer was gross',
                email: 'bob@bob.com'
            }
        ]
    };

    const tacoBell = {
        name: 'tacobell',
        cuisine: 'other',
        reviews: [
            {
                rating: 1,
                comments: 'not good',
                email: 'joe@joe.com'
            }
        ]
    };

    const review1 = {
        rating: 1,
        comments: 'not good',
        email: 'joe@joe.com'
    };

    function saveReview(review){
        return request.post(`/restaurants/${tacoBell._id}/reviews`)
            .send(review)
            .then(({ body }) => {
                review._id = body._id;
                return body;
            });
    }

    function saveRestaurant(restaurant) {
        return request.post('/restaurants')
            .send(restaurant)
            .then(({ body }) => {
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                restaurant.reviews = body.reviews;
                restaurant.reviews._id = body.reviews._id;
                return body;
            });
    }

    it('saves a restaurant', () => {
        return saveRestaurant(deschutes)
            .then(savedRestaurant => {
                assert.ok(savedRestaurant._id);
                assert.equal(savedRestaurant.name, deschutes.name);
                assert.equal(savedRestaurant.reviews, deschutes.reviews);
            });
    });

    xit ('saves a review', () => {
        return saveReview(review1)
            .then(savedReview => {
                assert.ok(savedReview._id);
                assert.equal(savedReview.rating, 1);
            });
    });

    it('gets a restaurant if it exists', () => {
        return request
            .get(`/restaurants/${deschutes._id}`)
            .then(res => res.body)
            .then(restaurant => {
                assert.deepEqual(restaurant, deschutes);
            });
    });

    it('gets all the restaurants', () => {
        return Promise.all([
            saveRestaurant(tacoBell)
        ])
            .then(() => request.get('/restaurants'))
            .then(res => {
                const deschutesRest = res.body[0];
                const tacobellRest = res.body[1];
                assert.deepEqual(deschutesRest, { _id: `${deschutes._id}`, name: 'deschutes', cuisine: 'northwest' });
                assert.deepEqual(tacobellRest, { _id: `${tacoBell._id}`, name: 'tacobell', cuisine: 'other' });
            });
    });

    it('gets three reviews from a restaurant', () => {
        return request
            .get(`/restaurants/${deschutes._id}`)
            .then(res => res.body)
            .then(restaurant => {
                assert.equal(restaurant.reviews.length, 3);
            });
    });

    xit('uses query to find rest with that cuisine', () => {
        return request
            .get('/restaurants?cuisine=northwest')
            .then(res => res.body)
            .then(restaurant => {
                console.log('restaurant is', restaurant);
                assert.deepEqual(restaurant, deschutes);
            });
    });

});
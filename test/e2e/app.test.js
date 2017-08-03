const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/backend-quiz-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe('restaurants REST api', () => {
    before(() => connection.dropDatabase());

    const chipotle = {
        name: 'Mexican Burritos, American Style',
        address: { street: 'Elm', city: 'San Junipero' },
        cuisine: 'northwest',
        reviews: []
    };

    const olivars = {
        name: 'PNW Italian Seafood',
        address: {
            street: 'Mockton',
            city: 'Wapato'
        },
        cuisine: 'euro',
        reviews: []
    };

    const review1 = {
        rating: 3,
        comments: 'I wouldn\'t let my dog eat their stuff',
        email: 'me@you.com'
    };

    const review2 = {
        rating: 5,
        comments: 'I would totally let let my dog eat their stuff',
        email: 'yuck@awkward.com'
    };

    const review3 = {
        rating: 1,
        comments: 'this is a bad place for dog food',
        email: 'them@yep.com'
    };

    const review4 = {
        rating: 3,
        comments: 'Their food tastes like my bird threw it up in my mouth. And that\'s happened before. not on purpose, but it definitely happened. Funny story actually..',
        email: 'yuck@awkward.com'
    };

    function saveRestaurant(restaurant) {
        return request.post('/restaurants')
            .send(restaurant)
            .then(({ body }) => {
                restaurant._id = body._id;
                return body;
            });
    }

    it('gets a list of restaurants', () => {
        return saveRestaurant(chipotle)
            .then(() => saveRestaurant(olivars))
            .then(() => {
                return request.get('/restaurants');
            })
            .then(res => {
                let restaurants = res.body;
                assert.equal(restaurants.length, 2);
                assert.equal(restaurants[0].name, chipotle.name);
                assert.equal(restaurants[1].name, olivars.name);
            });
    });

    it.skip('gets a restaurant based on cuisine query', () => {
        return request.get('/restaurants?cuisine=northwest')
            .then(res => {
                let restaurant = res.body;
                assert.equal(restaurant.cuisine, 'northwest');
                assert.equal(restaurant.name, 'Mexican Burritos, American Style');
            });
    });

    it.skip('gets a restaurant by id, including its reviews', () => {
        return Promise.all([
            request.put(`/restaurants/${chipotle._id}`)
                .send(review1),
            request.put(`/restaurants/${chipotle._id}`)
                .send(review2),
            request.put(`/restaurants/${chipotle._id}`)
                .send(review3)
        ])
            .then(() => {
                return request.get(`/restaurants/${chipotle._id}`);
            })
            .then(res => {
                let returned = res.body;
                assert.equal(returned.reviews.length, 3);
            });

    });
});
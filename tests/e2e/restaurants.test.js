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
                assert.ok(deschutesRest);
                assert.ok(tacobellRest);
            });
    });

});
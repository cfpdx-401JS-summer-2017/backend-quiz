const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/quiz-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

xdescribe('REST API for restaurants', () => {

    before(() => connection.dropDatabase());

    const asian = {
        name: 'Happy Restaurant',
        address: { street: '123 Happy Street', city: 'Portland'}
    };

    const comfort = {
        name: 'Comfort Restaurant',
        address: { street: '123 Comfort Street', city: 'Portland'}
    };

    function saveRestaurant(restaurant) {
        return request.post('/restaurants')
            .send(restaurant)
            .then(({ body }) => {
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                return body;
            });
    }

    it('saves a restaurant', () => {
        return saveRestaurant(asian)
            .then(savedRest => {
                assert.ok(savedRest._id);
                assert.deepEqual(savedRest, asian);
            });
    });
});
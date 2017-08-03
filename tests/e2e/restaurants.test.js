const db = require('./helpers/db');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/restaurants-test';

require('../../connect');

const connection = require('mongoose').connection;

const app = require('../../app');
const request = chai.request(app);


describe('restaurant REST api', () => {
    before(() => connection.dropDatabase());

    const bamboo = {
        name: 'Bamboo',
        address: {
            street: 'NW 11th',
            city: 'Portland'
        },
        cuisine: {
            type: 'asian'
        }
    };

    const gardenBar = {
        name: 'Garden Bar',
        address: {
            street: 'NW 11th',
            city: 'Portland'
        },
        cuisine: {
            type: 'other'
        }
    };

    function saveRestaurant(restaurant){
        return request.post('/restaurants')
            .send(restaurant)
            .then(({ body}) => {
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                return body;
            });
    }

    it('saves a restaurant', () => {
        return saveRestaurant(bamboo)
            .then(savedRestaurant => {
                assert.isOk(savedRestaurant._id);
                assert.deepEqual(savedRestaurant, bamboo);
            });
    });

    it('gets all restaurants', () => {
        return Promise.all([
            saveRestaurant(gardenBar)
        ])
            .then(() => request.get('/restaurants'))
            .then(res => {
                const restaurants = [res.body[0].name, res.body[1].name];
                assert.deepEqual(restaurants, [bamboo.name, gardenBar.name]);
            });
    });

});
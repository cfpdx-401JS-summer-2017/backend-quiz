const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/restaurant-quiz-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('restaurant api', () => {

    beforeEach(() => connection.dropDatabase());

    function save(restaurant) {
        return request.post('/restaurants')
            .send(restaurant)
            .then(({ body }) => {
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                return body;
            });
    }

    it('saves a restaurant', () => {
        let joelDeli = {
            name: 'Joel\'s Deli',
            address: {
                street: '102 NW Main St',
                city: 'Portland'
            },
            cuisine: 'asian',
            reviews: []
        };

        return save(joelDeli)
            .then(saved => {
                assert.isOk(saved._id);
                assert.deepEqual(saved, joelDeli);
            });
    });

    it('gets all restaurants', () => {
        let newRestaurants = [
            { name: 'Bobby Burger', cuisine: 'comfort' },
            { name: 'Kung Pow!', cuisine: 'asian' },
            { name: 'Whole Foods', cuisine: 'other' }
        ];

        let newArray = [];

        return Promise.all(newRestaurants.map(save))
            .then(saved => {
                saved.map(a => {
                    newArray.push({ _id: a._id, name: a.name, cuisine: a.cuisine });
                });
            })

            .then(() => request.get('/restaurants'))
            .then(res => {
                // console.log(res.body);
                assert.deepEqual(res.body, newArray);
            });
    });
    
});
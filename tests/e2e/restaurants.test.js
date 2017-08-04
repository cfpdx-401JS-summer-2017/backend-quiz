const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe('restaurants REST api', () =>{
    before(() => connection.dropDatabase());

    it('inital /GET returns empty list', ()=>{
        return request.get('/restaurants')
            .then(req => {
                const restaurants = req.body;
                assert.deepEqual(restaurants, []);
            });
    });
    const restaurant1 = {
        name: 'how',
        address:{
            street: 'dumb ln',
            city: 'Portland'
        },
        cuisine: 'asian'
    };
    const restaurant2 = {
        name: 'now',
        address:{
            street: 'fart ln',
            city: 'Portlandia'
        },
        cuisine: 'northwest'
    };
    function saveRestaurant(restaurant) {
        return request
            .post('/restaurants')
            .send(restaurant)
            .then(({body}) =>{
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                return body;
            });
    }
    it('saves a restaurant', () => {
        return saveRestaurant(restaurant1)
            .then(savedRestaurant => {
                assert.isOk(savedRestaurant._id);
                assert.equal(savedRestaurant.name, restaurant1.name);
                assert.equal(savedRestaurant.cuisine, restaurant1.cuisine);
            });
    });
    
    it('GETs restaurant if it exists', () => {
        return request
            .get(`/restaurants/${restaurant1._id}`)
            .then(res => res.body)
            .then(restaurant => {
                assert.equal(restaurant.name, restaurant1.name);
                assert.equal(restaurant.cuisine, restaurant1.cuisine);
            });
    });
    it.skip('GETs restaurant by cuisine', () => {
        return request
            .get(`/restaurants?cuisine=${restaurant1.cuisine}`)
            .then(res => res.body)
            .then(restaurant => {
                assert.equal(restaurant.name, restaurant1.name);
                assert.equal(restaurant.cuisine, restaurant1.cuisine);
            });
    });

    it('GET all restaurants', () => {
        return Promise.all([
            saveRestaurant(restaurant2),
        ])
            .then(() => request
                .get('/restaurants')
            )
                
            .then(res => {
                const restaurants = res.body;
                assert.deepEqual(restaurants, [restaurant1, restaurant2]);
            });
    });




});
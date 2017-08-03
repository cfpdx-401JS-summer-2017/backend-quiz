const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const db = require('./helpers/db');
const request = require('./helpers/request');



const connection = require('mongoose').connection;

const app = require('../../../lib/app');
const request = chai.request(app);

describe('restaurants REST api', () => {
    before(db.drop);

    let restaurant1 = {
        name: 'Bambino',
        address: {
            street: 'couch', 
            city: 'Portland'
        },
        cuisine: 'asians'
        
    };

    let restaurant2 = {
        name: 'Good Food',
        address:{
            street: 'Burnside', 
            city: 'Atlanta'
        },
        cuisine: 'Congolese'
    };

    let restaurant3 = {
        name: 'Happy Life',
        address: {
            street: 'Yamhill', 
            city: 'Philadelphia'
        }, 
        cuisine: 'French'
    };

    function saveRestaurant(restaurant) {
        return request
            .post('/restaurants')
            .send(restaurant)
            .then(({body}) => {
                restaurant._id = body._id;
                restaurant.__v = body.__v;
                return body;
            });
    }

    it.only('saves an restaurant', () => {
        return saveRestaurant(restaurant1)
            .then(savedRestaurant => {
             assert.isOk(savedRestaurant._id);
             assert.equal(savedRestaurant.name, restaurant1.name);
             assert.equal(savedRestaurant.genre, restaurant1.genre);
             assert.equal(savedRestaurant.year, restaurant1.year); 
            //  restaurant1._id = savedRestaurant._id;
            })
            // .then(() => {
            //     return request 
            // .get(`/restaurants/${restaurant1._id}`)
            // .set('Authorization', token)
            // })
            // .then(res => res.body)
    });

    it.only('GETs restaurant if it exists', () => {
        return request
            .get(`/restaurants/${restaurant1._id}`)
            .then(res => res.body)
            .then(restaurant => { 
                assert.ok(restaurant._id);
                assert.equal(restaurant.name, restaurant1.name);
                
        });
    });

    it.only('returns 404 if restaurant does not exist', () => {
        const nonId = '58ff9f496aafd447254c29b5';
        return request
        .get(`/restaurants/${nonId}`)
        .then(
            () => {
                throw new Error('successful status code not expected');
            },
            ({ response }) => {
                assert.ok(response.notFound);
            }
        );
    });

    it.only('GETs all restaurants', () => {
        return Promise.all([
            saveRestaurant(restaurant2),
            saveRestaurant(restaurant3)
        ])
            .then(() => request
            .get('/restaurants')
            .then(res => {
                let restaurants = res.body;
                assert.deepEqual(restaurants, [restaurant1, restaurant2, restaurant3]);
            });
    });
    it.only('DELETES the restaurant by id', () => {
        return request
        .delete(`/restaurants/${restaurant3._id}`)
        .then (res => {
            assert.deepEqual(JSON.parse(res.text), {removed: true});
        })
    });
    it.only('Replaces an restaurant with a another', () => {
        let restaurant2 = {
        name: 'Dirty Grub',
        address:{
            street: 'Peachtree', 
            city: 'Dakota'
        },
        cuisine: 'Euro'
    };
        return request 
        .put(`/restaurants/${restaurant1._id}`)
        .send(restaurant4)        
        .then( res => res.body)
        .then(body => {
            // getting the id to equal what we are comparing this to. 
            restaurant4._id = body._id;
            assert.deepEqual(body, restaurant4)
        });
    });
});
const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('restaurants model', () => {
    before(db.drop);

    it('initial GET returns empty list', () => {
        return request.get('/restaurants')
            .then(req => {
                const restaurants = req.body;
                assert.deepEqual(restaurants, []);
            });
    });

    let losGorditos = {
        name: 'Los Gorditos',
        address: {
            street: 'NW Davis St',
            city: 'Portland, OR'
        },
        cuisine: 'other'
    };

    function saveRestaurant(restaurant){
        return request
            .post('/restaurants')
            .send(restaurant)
            .then(res => res.body);
    }

    it('roundtrips a new restaurant', () => {
        return saveRestaurant(losGorditos)
            .then(saved => {
                assert.ok(saved._id, 'saved has id');
                losGorditos = saved;
            })
            .then(() => {
                return request.get(`/restaurants/${losGorditos._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, losGorditos);
            });
    });
});
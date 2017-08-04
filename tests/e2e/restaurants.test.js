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

    let spaceRoom = {
        name: 'Space Room',
        address: {
            street: 'SE Hawthorne Blvd',
            city: 'Portland, OR'
        },
        cuisine: 'space food'
    };

    let kungPow = {
        name: 'Kung Pow!',
        address: {
            street: 'NW 21st Avenue',
            city: 'Portland, OR'
        },
        cuisine: 'asian'
    };

    let bobbyBurger = {
        name: 'Bobby\'s Burger Palace',
        cuisine: 'comfort'
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

    it('rejects unmatched cuisine', () => {
        return saveRestaurant(spaceRoom)
            .then(
                () => { throw new Error('expected 400');},
                res => {
                    assert.equal(res.status, 400);
                }
            );
    });

    it('returns list of all restaurants', () => {
        return Promise.all([
            saveRestaurant(kungPow),
            saveRestaurant(bobbyBurger)
        ])
            .then(() => request.get('/restaurants'))
            .then(res => res.body)
            .then(restaurants => {
                assert.equal(restaurants.length, 3);
            });
    });

    // it('finds by cuisine', () => {
    //     return request.get(`/restaurants/${kungPow.cuisine}`)
    //         .then(res => res.body)
    //         .then(restaurants => {
    //             assert.equal(restaurants.length, 1);
    //         });
    // });
});
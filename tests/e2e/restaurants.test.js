const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('restaurants route', () => {
    before(db.drop);

    it('initial GET returns empty list', () => {
        return request.get('/restaurants')
            .then(req => {
                const restaurants = req.body;
                assert.deepEqual(restaurants, []);
            });
    });

    let littleBigBurger = {
        name: 'Little Big Burger',
        address: {
            street: '10th',
            city: 'Portland'
        },
        cuisine: 'comfort'
    };

    let zienHong = {
        name: 'Zien Hong',
        address: {
            street: 'Sandy',
            city: 'Portland'
        },
        cuisine: 'asian'
    };

    let jackalopeGrill = {
        name: 'Jackalope Grill',
        address: {
            street: 'Bond',
            city: 'Bend'
        },
        cuisine: 'Northwest'
    };

    function saveRestaurant(restaurant) {
        return request
            .post('/restaurants')
            .send(restaurant)
            .then(res => res.body);
    }

    it('roundtrips a new restaurant', () => {
        return saveRestaurant(littleBigBurger)
            .then(saved => {
                assert.ok(saved._id, 'saved has id');
                littleBigBurger = saved;
            })
            .then(() => {
                return request.get(`/restaurants/${littleBigBurger._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, littleBigBurger);
            });
    });
    
    it('GET returns 404 for non-existent id', () => {
        const nonId = '589d04a8b6695bbdfd3106f1';
        return request.get(`/restaurants/${nonId}`)
            .then(
                () => { throw new Error('expected 404');},
                res => {
                    assert.equal(res.status, 404);
                }
            );
    });

    it('returns list of all restaurants', () => {
        return Promise.all([
            saveRestaurant(zienHong),
            saveRestaurant(jackalopeGrill)
        ])
            .then(savedRestaurants => {
                zienHong = savedRestaurants[1];
                jackalopeGrill = savedRestaurants[2];
            })
            .then(() => request.get('/restaurants'))
            .then(res => res.body)
            .then(restaurants => {
                assert.isTrue(restaurants.length>1);
            });
    });
    
    it ('updates restaurant', () => {
        littleBigBurger.cuisine = 'other';
        return request.put(`/restaurants/${littleBigBurger._id}`)
            .send(littleBigBurger)
            .then(res => res.body)
            .then(updated => {
                assert.equal(updated.cuisine, 'other');
            });
    });
    it ('deletes an restaurant', () => {
        return request.delete(`/restaurants/${zienHong._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            });
    });
    it ('delete a non-existent restaurant is removed false', () => {
        return request.delete(`/restaurants/${zienHong._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });
    it('errors on validation failure', () => {
        return saveRestaurant({})
            .then(
                () => { throw new Error('unexpected failure'); },
                (errors) => {
                    assert.equal(errors.status, 400);
                }
            );
    });
});
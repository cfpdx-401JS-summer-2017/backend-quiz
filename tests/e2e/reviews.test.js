const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('reviews model', () => {
    before(db.drop);

    it('initial GET returns empty list', () => {
        return request.get('/reviews')
            .then(req => {
                const reviews = req.body;
                assert.deepEqual(reviews, []);
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
        cuisine: 'northwest'
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
            .then(res => {
                restaurant._id = res.body._id;
                return res.body;
            });
    }

    before(() => {
        return Promise.all([
            saveRestaurant(losGorditos),
            saveRestaurant(spaceRoom),
            saveRestaurant(kungPow),
            saveRestaurant(bobbyBurger)
        ]);
    });
    
    function saveReview(review, restaurant) {
        review.restaurant = restaurant._id;
        return request
            .post('/reviews')
            .send(review)
            .then(res => {
                review._id = res.body._id;
                return res.body;
            });
    }

    it('roundtrips a new review', () => {
        let losGorditosReview = {
            rating: 5,
            comments: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
            email: 'user1@yelp.com',
            restaurant: losGorditos._id
        };
        return saveReview(losGorditosReview, losGorditos)
            .then(saved => {
                assert.ok(saved._id, 'saved has id');
                losGorditosReview = saved;
            })
            .then(() => {
                return request.get(`/reviews/${losGorditosReview._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, losGorditosReview);
            });
    });

    it('rejects too low a rating', () => {
        let bobbyBurgerReview = {
            rating: 0,
            comments: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
            email: 'user2@yelp.com',
            restaurant: spaceRoom._id
        };
        return saveReview(bobbyBurgerReview, bobbyBurger)
            .then(
                () => { throw new Error('expected 400');},
                res => {
                    assert.equal(res.status, 400);
                }
            );
    });

    it('returns list of all reviews', () => {
        let spaceRoomReview = {
            rating: 4,
            comments: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
            email: 'user3@yelp.com',
            restaurant: spaceRoom._id
        };
        let kungPowReview = {
            rating: 2,
            comments: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
            email: 'user4@yelp.com',
            restaurant: kungPow._id
        };
        return Promise.all([
            saveReview(spaceRoomReview, spaceRoom),
            saveReview(kungPowReview, kungPow)
        ])
            .then(() => request.get('/reviews'))
            .then(res => res.body)
            .then(reviews => {
                assert.equal(reviews.length, 3);
            });
    });
});
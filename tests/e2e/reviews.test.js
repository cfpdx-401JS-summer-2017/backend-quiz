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
        console.log('losGorditos._id = ', losGorditos._id);
        let losGorditosReview = {
            rating: 5,
            comments: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
            email: 'somebody@yelp.com',
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
});
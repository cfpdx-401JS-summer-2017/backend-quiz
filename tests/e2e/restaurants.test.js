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

    // POST to /restaurant/:id/reviews:
    // You need to check if that user (via email prop) does NOT already have a review for this restaurant. If they do, return 400 error and don't save the review.

    // it('saves reviews for a restaurant', () => {
    //     let charlie = {
    //         name: 'Charlie\'s Deli',
    //         address: {
    //             street: '103 NW Main St',
    //             city: 'Portland'
    //         },
    //         cuisine: 'other'
    //     };

    //     let reviews = [
    //         { rating: 5, comments: 'I liked it', email: 'someone@email.com' },
    //         { rating: 3, comments: 'I sort of liked it', email: 'someone3@email.com' },
    //         { rating: 1, comments: 'I hated it', email: 'someone2@email.com' },
    //     ];

    //     return save(charlie)
    //         .then(saved => charlie = saved)
    //         .then()
    // });

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

    it('gets a restaurant by id', () => {
        let christy = {
            name: 'Christy\'s Deli',
            address: {
                street: '101 NW Main St',
                city: 'Portland'
            },
            cuisine: 'asian',
            reviews: []
        };

        return save(christy)
            .then(saved => christy = saved)
            .then(() => request.get(`/restaurants/${christy._id}`))
            .then(res => {
                assert.deepEqual(res.body, christy);
            });


    });
    
});
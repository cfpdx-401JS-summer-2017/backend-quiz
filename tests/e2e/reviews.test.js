const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe('reviews REST api', () =>{
    before(() => connection.dropDatabase());

    let user = null;
    before(() => {
        return request.post('/users')
            .send({email: 'thedude@duuude.com'})
            .then(res => res.body)
            .then(savedStudio => user = savedStudio);
    });

    it('inital /GET returns empty list', ()=>{
        return request.get('/reviews')
            .then(req => {
                const reviews = req.body;
                assert.deepEqual(reviews, []);
            });
    });
    let review1 = {
        rating: 1,
        comments: 'wowowowowowowowow',
    };
    let review2 = {
        rating: 2,
        comments: 'hohohohohohohoho',
    };
    let review3 = {
        rating: 3,
        comments: 'nononononononononon',
    };
    let review4 = {
        rating: 4,
        comments: 'yoyoyoyoyoyoyoyoyoyo',
    };

    function saveRewiew(review) {
        review.email = user.email;
        return request
            .post('/review')
            .send(review)
            .then(res => res.body);
    }
    
    it.skip('roundtrip gets a new review', () => {
        return saveRewiew(review1)
            .then(saved => {
                assert.ok(saved._id, 'saved has ID');
                review1 = saved;
            })
            .then(() => {
                return request.get(`/films/${review1._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, review1);
            });
    });





});
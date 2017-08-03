const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/quiz-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

xdescribe('REST API for reviews', () => {
    before(() => connection.dropDatabase());


    const review1 = {
        rating: 1,
        comments: 'Something',
        email: 'something@something.com'
    };


    function saveReview(review) {
        return request.post('/reviews')
            .send(review)
            .then(({ body }) => {
                review._id = body._id;
                review.__v = body.__v;
                return review;
            });
    }

    it('saves a review', () => {
        return saveReview(review1)
            .then(savedR => {
                assert.ok(savedR._id);
                assert.deepEqual(savedR, review1);
            });
    });
});
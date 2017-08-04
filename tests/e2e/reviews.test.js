const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGO_URI = 'mongodb://localhost:27017/restaurants-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('restaurant API', () => {
    before(() => connection.dropDatabase());

    it('saves a review', () => {

    });
});
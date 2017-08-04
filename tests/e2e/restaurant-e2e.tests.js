const app = require('../../lib/app');
// const testHelper = require('../helpers/test-helper');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

describe('restaurant API', () => {
    //   let testRestaurant = testHelper.restaurant;
    //   let testReview = testHelper.review;
    const req = chai.request(app);

    let testRestaurant = {
        name: 'Food Coma',
        address: {
            street: 'Main Street',
            city: 'Any City'
        },
        cuisine: 'other',
        reviews: []
    };
    it('POST /restaurant', () => {
        return req.post('/restaurant')
            .send({restaurant: testRestaurant})
            .then(res => {
                console.log('success: ', res);
            })

    })

})



//   * POST two restaurants, each of a different type of cuisine
//   * **Test** that `GET` `/restaurants` returns both restaurants
//   * **Test** that `GET` `/restaurants?cuisine=<one of the cuisines>` only returns one of the restaurants
//   * POST three reviews from three different user emails to one of the restaurants
//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews
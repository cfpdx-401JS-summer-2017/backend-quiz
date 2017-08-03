const Review = require('../../lib/models/review');
const User = require('../../lib/models/user');
const {assert} = require('chai');
describe('Review model', () => {
    it('validates with requred fields', () => {
        const user = new User({
            email:'wutwut@bi.com'
        })
        const review = new Review({
            rating: 3,
            comments:'AAAAAAAAAAAAAAAAAAAAAAAAAAAAH',
            email: user._id
        });
        return review.validate();
    });
    it('fails validation when required fields are missing', () => {
        const review = new Review();

        return review.validate()
            .then( () => {
                throw new Error('Expected Validation error');
            }, ({errors}) =>{
                assert.ok(errors.rating);
            });
    });
});
const Review = require('../../lib/models/review');
const { assert } = require('chai');

describe('reviews model', () => {

    it('validates the review', () => {
        const review = new Review({
            rating: 4,
            comments: 'I really enjoy the fries.',
            email: 'me@me.com'
        });
        return review.validate();
    });

    it('fails validation if required fields missing', () => {
        const review = new Review();
        return review.validate()
            .then(
                () => {throw new Error('expected validation error');},
                ({ errors}) => {
                    assert.ok(errors.rating, errors.comment, errors.email);
                }
            );
    });
});
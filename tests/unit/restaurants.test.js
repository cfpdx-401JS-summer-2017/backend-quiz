const Restaurant = require('../../lib/models/restaurant');
const { assert } = require('chai');

describe('restaurants model', () => {

    it('validates the restaurant', () => {
        const restaurant = new Restaurant({
            name: 'Little Big Burger',
            address: {
                street: 'NW 10th',
                city: 'Portland'
            },
            cuisine: 'other'

        });
        return restaurant.validate();
    });

    it('fails validation if required fields missing', () => {
        const restaurant = new Restaurant();
        return restaurant.validate()
            .then(
                () => {throw new Error('expected validation error');},
                ({ errors}) => {
                    assert.ok(errors.name, errors.cuisine);
                }
            );
    });
});
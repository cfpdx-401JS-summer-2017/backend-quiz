const assert = require('chai').assert;
const Restaurant = require('../../lib/models/restaurant');

const expectedValidation = () => {throw new Error('expected validation errors');};

describe('Restaurants model', () => {
    
    it('validates good model', () => {
        const restaurant = new Restaurant({
            name: 'LittleBigBurger',
            address: {
                street: '10th',
                city: 'Portland'
            },
            cuisine: 'comfort'
        });
        return restaurant.validate();
    });

    describe('validation failures', () => {

        it('name and cuisine are required', () => {
            const restaurant = new Restaurant();
            return restaurant.validate()
                .then(expectedValidation,
                    err => {
                        const errors = err.errors;
                        assert.ok(errors.name && errors.name.kind === 'required');
                        assert.ok(errors.cuisine && errors.cuisine.kind === 'required');
                    });
        });
    });
});
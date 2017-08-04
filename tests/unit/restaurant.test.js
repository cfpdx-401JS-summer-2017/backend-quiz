const Restaurant = require('../../lib/models/restaurant');
const {assert} = require('chai');
describe('Restaurant model', () => {
    it('validates with requred fields', () => {
        const restaurant = new Restaurant({
            name: 'how',
            address:{
                street: 'dumb ln',
                city: 'Portland'
            },
            cuisine: 'asian'
        });
        return restaurant.validate();
    });
    it('fails validation when required fields are missing', () => {
        const restaurant = new Restaurant();

        return restaurant.validate()
            .then( () => {
                throw new Error('Expected Validation error');
            }, ({errors}) =>{
                assert.ok(errors.name);
            });
    });
});
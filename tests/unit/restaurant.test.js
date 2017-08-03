const assert = require('chai').assert;
const Restaurant = require('../../lib/models/restaurant');

describe('Restaurant model', () => {

    it('validates with required fields', () => {
        const deli = new Restaurant({
            name: 'Christy\'s Deli',
            address: {
                street: '101 NW Main St',
                city: 'Portland'
            },
            cuisine: 'asian'
        });

        return deli.validate();

    });

});

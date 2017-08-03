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

    it('does not validate without required fields', () => {
        const company = new Restaurant();

        return company.validate()
            .then(
                () => { throw new Error('Expected validation error'); },
                ({ errors }) => {
                    assert.ok(errors.name);
                    assert.ok(errors.cuisine);
                }
            );
    });

    // it('name and legs are required', () => {
    //     const pet = new Restaurant();
    //     return pet.validate()
    //         .then(expectedValidation, err => {
    //             const errors = err.errors;
    //             assert.ok(errors.legs && errors.legs.kind === 'required');
    //             assert.ok(errors.name && errors.name.kind === 'required');
    //             assert.ok(errors.store && errors.store.kind === 'required');
    //         });
    // });

});

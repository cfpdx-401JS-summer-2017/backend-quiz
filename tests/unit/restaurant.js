const { assert } = require('chai');
const Actor = require('../../lib/models/restaurant');

describe('Actor model unit tests', () => {
    it('validates the restaurant model', () => {
        const actor = new Actor({
            name: 'Bambino',
            address: {
                street: 'couch',
                city: 'Portland'
            },
            cuisine: 'asians'

        });
        return restaurant.validate();
    });

    it('fails validation when required fields are missing', () => {
        const restaurant = new Restaurant();

        return restaurant.validate()
            .then(
            () => { throw new Error('Expected validation error'); },
            ({ errors }) => assert.ok(errors.name.kind)
            );
    });

    it('should be type string', () => {
        const restaurant = new Restaurant({
            name: 'Bambino',
            address: {
                street: 'couch',
                city: 'Portland'
            },
            cuisine: 'asians'

        });

        return restaurant.validate()
            .then(
            () => { throw new Error('Expected to be of type date'); },
            ({ errors }) => assert.equal(errors['name'].kind, 'string')
            );
    });
});
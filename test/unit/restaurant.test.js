const Restaurant = require('../../lib/models/restaurant');
const {assert} = require('chai');

describe('restaurant', () => {

    it('validates with required fields', () => {
        const ginkgo = new Restaurant({
            name: 'Ginkgo Tree',
            address: { city: 'Ellensburg' },
            cuisine: 'other',
            reviews: []
        });

        return ginkgo.validate();
    });

});
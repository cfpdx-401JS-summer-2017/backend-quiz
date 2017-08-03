const { assert } = require('chai');
const Restaurant = require('../../lib/models/restaurant');

describe('Restaurant model unit tests', () => {

    it('validates required fields for restaurant model', () => {
        const restaurant = new Restaurant({
            name: 'Good Restaurant',
            address: {
                street: '123 Happy Street',
                city: 'Portland'
            },
            cuisine: 'asian'
        });
        return restaurant.validate();
    });








});
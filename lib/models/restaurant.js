const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String
    },
    cuisine: {
        type: String,
        enum: ['asian', 'euro', 'northwest', 'comfort', 'other'],
        required: true
    },
    reviews: [{
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comments: {
            type: String,
            required: true,
            maxlength: 250
        },
        email: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Restaurant', schema);
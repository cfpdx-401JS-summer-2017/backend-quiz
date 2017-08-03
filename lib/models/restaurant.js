const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const requiredString = {
    type: String,
    required: true
};

const requiredCuisine = {
    type: String,
    options: ['asian', 'euro', 'northwest', 'comfort', 'other'],
    required: true
};

const schema = new Schema({
    name: requiredString,
    address: {
        street: String,
        city: String
    },
    cuisine: requiredCuisine

});

module.exports = mongoose.model('Restaurant', schema);
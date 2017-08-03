const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema([{
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
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
}]);

module.exports = mongoose.model('Review', schema);
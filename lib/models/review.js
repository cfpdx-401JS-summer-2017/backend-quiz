const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    rating: Number,
    comments: String,
    email: String,
    required: true
});

module.exports = mongoose.model('Review', schema);
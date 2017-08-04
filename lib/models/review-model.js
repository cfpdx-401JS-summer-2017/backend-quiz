const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    comments: { type: String, required: true, maxlength: 250 },
    email: { type: String, required: true, lowercase: true }
}, { runSettersOnQuery: true });

module.exports = mongoose.model('Review', reviewSchema);
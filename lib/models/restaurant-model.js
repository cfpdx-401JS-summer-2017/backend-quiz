const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String }
    },
    cuisine: { type: String, required: true, enum: ['asian', 'euro', 'northwest', 'comfort', 'other'] },
    reviews: [
        { type: Schema.Types.ObjectId, required: false }
    ]

})

module.exports = mongoose.model('Restaurant', restaurantSchema);
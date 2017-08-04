const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reveSche = new Schema({
    rating:{
        type: Number,
        min:1,
        max:5,
        required:true
    },
    comments: {
        type: String,
        required:true
    },
    email:{
        type: Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model('Review',reveSche);
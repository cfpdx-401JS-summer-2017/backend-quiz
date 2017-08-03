const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const useSche = new Schema({
    email:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User',useSche);
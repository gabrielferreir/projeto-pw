const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Breed = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Breed', Breed);
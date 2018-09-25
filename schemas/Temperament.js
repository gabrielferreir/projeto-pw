const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Temperament = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Temperament', Temperament);
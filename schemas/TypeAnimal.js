const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const TypeAnimal = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('TypeAnimal', TypeAnimal);
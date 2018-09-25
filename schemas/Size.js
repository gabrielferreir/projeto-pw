const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Size = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Size', Size);
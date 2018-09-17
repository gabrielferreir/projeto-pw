const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const User = new Schema({
    name: String,
    email: String,
    pass: String,
    image: String,
    phone: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Animal = new Schema({
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    typeAnimal: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'TypeAnimal',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    genre: {
        type: String,
        maxLength: 1
    },
    size: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Size',
        required: true
    },
    breed: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Breed',
        required: true
    },
    temperament: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Temperament',
        required: true
    },
    age: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 1
    },
    phone: {
        type: String
    },
    images: {},
    cep: {
        type: String
    },
    street: {
        type: String
    },
    number: {
        type: Number
    },
    neighborhood: {
        type: String
    },
    uf: {
        type: String,
        maxLength: 2
    },
    city: {
        type: String
    },
    complement: {
        type: String
    }

});

module.exports = mongoose.model('Animal', Animal);
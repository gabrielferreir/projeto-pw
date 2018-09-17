const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root123@ds255282.mlab.com:55282/project_pw', {useNewUrlParser: true});

const mongoConnection = mongoose.connection;

mongoConnection.on('error', err => {
    console.log(err.message);
});

mongoConnection.once('open', function () {
    console.log('Conectado com sucesso! (Mongo)');
});
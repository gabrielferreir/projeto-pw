const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const animalRouter = require('./routes/animal');
const temperamentRouter = require('./routes/temperament');
const sizeRouter = require('./routes/size');
const breedRouter = require('./routes/breed');
const typeAnimaldRouter = require('./routes/typeAnimal');

const {InvalidParam} = require('node-schema-validator');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/mongoose');

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalRouter);
app.use('/temperament', temperamentRouter);
app.use('/size', sizeRouter);
app.use('/breed', breedRouter);
app.use('/type-animal', typeAnimaldRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {

    if (err instanceof InvalidParam)
        return res.status(400).json(err);


    return res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        stack: err.stack
    });

});

module.exports = app;

const Schema = require('../schemas/users');
const Validation = require('../helpers/validator/validation');
const crypto = require('../helpers/crypto/crypto');

module.exports = {
    create,
    update,
    read,
    remove
};

async function create(req, res, next) {
    try {
        const params = {
            name: req.body.name,
            email: req.body.email,
            pass: crypto.encryptMd5(req.body.pass),
            image: req.body.image,
            phone: req.body.phone,
        };

        Schema.create(params).then(response => {
            res.status(200).json({
                message: 'OK',
                id: response.id
            })
        }, err => {
            next(err)
        });

    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        Schema.findOneAndUpdate({_id: req.params.id}, req.body, null, (err, doc) => {
            if (err) next(err)
            return res.status(200).json({message: 'OK'});
        });
    } catch (e) {
        next(err);
    }
}

async function read(req, res, next) {
    try {
        Schema.findById(req.params.id, (err, user) => {
            if (err) next(err);
            return res.status(200).json(user || {});
        });
    } catch (e) {

    }
}

async function remove(req, res, next) {
    try {
        Schema.remove({_id: req.params.id}, err => {
            if (err) next(err);
            return res.status(200).json({message: 'OK'});
        });
    } catch (e) {

    }

}
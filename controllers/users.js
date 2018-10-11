const Schema = require('../schemas/Users');
const crypto = require('../helpers/crypto/crypto');
const Validator = require('../helpers/validator/validator2');

module.exports = {
    create,
    update,
    read,
    remove
};

async function create(req, res, next) {
    try {
        const params = {
            name: 'as',
            email: req.body.email,
            pass: crypto.encryptMd5(req.body.pass),
            image: req.body.image,
            phone: [
                {ddd: 10},
                {pax: 10}
            ],
        };

        const schema = {
            name: {
                required: true,
                minLength: 2
            },
            phone: {
                type: Array,
                max: 4,
                min: 1,
                childs: {
                    ddd: {
                        required: true
                    },
                    number: {
                        required: true
                    }
                }
            },
            dependentes: {
                type: Array,
                childs: {
                    nome: {
                        required: true
                    },
                    phones: {
                        type: Array,
                        childs: {
                            dddPhones: {
                                required: true
                            }
                        }
                    }
                }
            }
            // email: {
            //     required: true
            // },
            // pass: {
            //     required: true
            // },
            // teste: {
            //     min: 2,
            //     max: 3
            // },
            // 'teste.p': {
            //     required: true
            // }
        };

        const invalid = Validator(params, schema);
        // console.log('invalid', invalid.errors);
        if (invalid.status === 400) {
            return next(invalid);
        }

        // Schema.create(params).then(response => {
        res.status(200).json({
            message: 'OK',
            // id: response.id
        })
        // }, err => {
        //     next(err)
        // });

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
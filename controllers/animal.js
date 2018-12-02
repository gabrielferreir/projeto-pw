const Schema = require('../schemas/Animal');
const {Scope} = require('node-schema-validator');
const auth = require('./users');

const schema = {
    idUser: {
        type: String,
        required: true
    },
    typeAnimal: {
        type: String,
        required: true
    },
    name: {
        type: String,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        maxLength: 200
    },
    genre: {
        isEqual: ['M', 'F']
    },
    size: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    temperament: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        maxLength: 11,
        minLength: 8,
        required: true
    },
    cep: {
        minLength: 8,
        maxLength: 8,
        required: true
    },
    street: {
        type: String,
        maxLength: 80,
        required: true
    },
    number: {
        type: String,
        maxLength: 4,
        required: true

    },
    neighborhood: {
        type: String,
        maxLength: 32,
        required: true
    },
    uf: {
        isEqual: ['SP', 'MG'],
        required: true
    },
    city: {
        type: String,
        maxLength: 32,
        required: true
    },
    complement: {
        type: String,
        maxLength: 255
    }
};

module.exports = {
    create,
    update,
    read,
    remove,
    readAll,
    myAnimals
};

async function create(req, res, next) {
    try {
        let params = {
            // idUser: req.body.idUser,
            typeAnimal: req.body.typeAnimal,
            name: req.body.name,
            description: req.body.description,
            genre: req.body.genre,
            size: req.body.size,
            breed: req.body.breed,
            temperament: req.body.temperament,
            age: req.body.age,
            // active: req.body.active,
            phone: req.body.phone,
            cep: req.body.cep,
            street: req.body.street,
            number: req.body.number,
            neighborhood: req.body.neighborhood,
            uf: req.body.uf,
            city: req.body.city,
            complement: req.body.complement
        };

        const infoUser = await auth.decodeToken(req.headers.authentication);
        params.idUser = infoUser.id;

        console.log(params);

        const scope = new Scope();
        scope.isValid(params, schema);

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
        const params = {
            idUser: req.body.idUser,
            typeAnimal: req.body.typeAnimal,
            name: req.body.name,
            description: req.body.description,
            genre: req.body.genre,
            size: req.body.size,
            breed: req.body.breed,
            temperament: req.body.temperament,
            age: req.body.age,
            active: req.body.active,
            phone: req.body.phone,
            cep: req.body.cep,
            street: req.body.street,
            number: req.body.number,
            neighborhood: req.body.neighborhood,
            uf: req.body.uf,
            city: req.body.city,
            complement: req.body.complement
        };

        const scope = new Scope();
        scope.isValid(params, schema);

        Schema.findOneAndUpdate({_id: req.params.id}, params, null, (err, doc) => {
            if (err) next(err);
            return res.status(200).json({message: 'OK'});
        });
    } catch (err) {
        next(err);
    }
}

async function read(req, res, next) {
    try {
        Schema.findById(req.params.id, (err, user) => {
            if (err) next(err);
            return res.status(200).json({content: user || {}});
        });
    } catch (e) {

    }
}

async function readAll(req, res, next) {
    try {
        const params = {
            typeAnimal: {
                name: req.query.tipo
            }
        };

        // console.log(params);
        Schema.find()
            .populate('idUser')
            .populate('typeAnimal')
            .populate('size')
            .populate('breed')
            .populate('temperament')
            .exec()
            .then(response => {
                res.json({content: response})
            }, err => {
                next(err)
            })

    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        Schema.remove({_id: req.params.id}, err => {
            if (err) next(err);
            return res.status(200).json({message: 'OK'});
        });
    } catch (error) {
        next(error);
    }
}

async function myAnimals(req, res, next) {
    try {
        console.log('myAnimals');
        const token = req.body.token || req.query.token || req.headers['authentication'];
        const decodeToken = await auth.decodeToken(token);
        // // const data = await repository.getMyAnimais(decodeToken.id);
        // console.log(decodeToken);

        Schema.find({idUser: decodeToken.id})
            .populate('idUser')
            .populate('typeAnimal')
            .populate('size')
            .populate('breed')
            .populate('temperament')
            .exec()
            .then(response => {
                return res.json({content: response})
            }, err => {
                next(err)
            });

    } catch (error) {
        next(error);
    }
}
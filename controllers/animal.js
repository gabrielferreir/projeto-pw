const Schema = require('../schemas/Animal');

module.exports = {
    create,
    update,
    read,
    remove,
    readAll
};

async function create(req, res, next) {
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
            complement: req.body.complement,
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
        const params = {
            name: req.body.name,
        };
        Schema.findOneAndUpdate({_id: req.params.id}, params, null, (err, doc) => {
            if (err) next(err);
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

async function readAll(req, res, next) {
    try {
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
    } catch (e) {

    }

}
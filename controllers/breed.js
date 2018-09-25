const Schema = require('../schemas/Breed');

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
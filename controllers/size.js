const Schema = require('../schemas/Size');
const {Scope} = require('node-schema-validator');

const schema = {
    name: {
        type: String,
        required: true,
        maxLength: 32
    }
};

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
            name: req.body.name,
        };

        const scope = new Scope();
        scope.isValid(params, schema);

        Schema.findOneAndUpdate({_id: req.params.id}, params, null, (err, doc) => {
            if (err) next(err)
            return res.status(200).json({message: 'OK'});
        });
    } catch (error) {
        next(error);
    }
}

async function read(req, res, next) {
    try {
        Schema.find({}).then(result => {
            return res.status(200).json({content: result || []});
        }).catch(error => next(error));
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        Schema.remove({_id: req.params.id}, err => {
            if (err) next(err);
            return res.status(200).json({message: 'OK'});
        });
    } catch (e) {
        next(error);
    }

}
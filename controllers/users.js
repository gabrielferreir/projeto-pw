const Schema = require('../schemas/users');
const Validation = require('../helpers/validation');

module.exports = {
    create
};

async function create(req, res, next) {
    try {
        const params = {
            // name: req.body.name,
            // email: req.body.email,
            // pass: req.body.pass,
            // image: req.body.image,
            // phone: req.body.phone,
            dependencias: req.body.dependencias
        };

        const resultError = Validation(params, {
            // name: {
            //     required: true
            // },
            // email: {
            //     required: true
            // },
            // pass: {
            //     required: true,
            //     maxLenght: 4,
            //     minLenght: 4
            // },
            dependencias: [{
                name: {
                    required: true,
                    minLenght: 3,
                    maxLenght: 8
                },
                phone: [{
                    ddd: {
                        required: true,
                        maxLenght: 3
                    },
                    number: [{
                        required: true,
                        maxLenght: 9
                    }]
                }]
            }]
        });


        res.status(200).json({
            message: 'OK',
            content: resultError
        });

    } catch (error) {
        next(error);
    }
}
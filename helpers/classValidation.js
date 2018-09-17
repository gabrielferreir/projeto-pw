module.exports = Validation;

class Validation {
    params;
    validator;

    constructor(params, validator) {
        this.params = params;
        this.validator = validator;
    }

}
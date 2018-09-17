module.exports = validation;

function validation(params, validator, property) {
    let errors = [];
    Object.keys(validator).forEach(key => {
        const listProporties = Array.isArray(validator[key]) ? validator[key][0] : validator[key];
        if (Array.isArray(validator[key])) {
            let paramsKey = [];
            params[key].forEach((sub, index) => {
                const subErrors = validation(sub, validator[key][0], key);
                paramsKey.push({index: index, ...subErrors});
            });
            errors.push({[key]: paramsKey})
        } else {
            Object.keys(listProporties).forEach((properties) => {
                const response = functions[properties](key, validator[key][properties], params[key]);
                if (response) errors.push(response);
            })
        }
    });
    return errors;
}

const functions = {
    required: required,
    maxLenght: maxLenght,
    minLenght: minLenght
};

function required(param, paramValue, value) {
    if (paramValue && !value)
        return {param: param, error: 'required', message: `"${param}" é requirido`};
    return false;
}

function maxLenght(param, paramValue, value) {
    if (value.length > paramValue)
        return {param: param, error: 'maxLength', message: `"${param}" deve ser <= ${paramValue}`};
    return false;
}

function minLenght(param, paramValue, value) {
    if (value.length < paramValue)
        return {param: param, error: 'minLenght', message: `"${param}" deve ser => ${paramValue}`};
    return false;
}
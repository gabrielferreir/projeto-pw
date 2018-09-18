module.exports = validador;

function validation(params, validator, property) {
    let errors = [];
    Object.keys(validator).forEach(key => {
        const listProporties = Array.isArray(validator[key]) ? validator[key][0] : validator[key];
        if (Array.isArray(validator[key])) {
            let arrayOfSubErros = [];
            const paramsKey = params[key] || [];
            paramsKey.forEach((sub, index) => {
                const subErrors = validation(sub, validator[key][0], key);
                arrayOfSubErros.push({index: index, ...subErrors});
            });
            errors.push({[key]: arrayOfSubErros})
        } else {
            Object.keys(listProporties).forEach((properties) => {
                const response = functions[properties](key, validator[key][properties], params[key]);
                if (response) errors.push(response);
            })
        }
    });
    return errors;
}

// const caminhos = [];

function validador(parametros, schemaValidador, caminho) {
    // // parametros = parametros || {};  // Pode não existir a propriedade no parametro e ela pode existir no schema
    // if (Array.isArray(schemaValidador))// Verifico se é um array
    //     schemaValidador = schemaValidador[0];    // Pego o primeiro elemento
    // Object.keys(schemaValidador).forEach(propDoValidador => {   // Percorro o schema atual
    //     if (schemaValidador[propDoValidador] instanceof Object) // Verifico se o schema é um objeto
    //         validador(schemaValidador[propDoValidador], `${caminho ? caminho + '.' : ''}${propDoValidador}`);   // Chamo novamente a função
    //     else {
    //         _validaCampo(caminho, propDoValidador, schemaValidador[propDoValidador]);
    //     }
    // });

    criaValidador(parametros, schemaValidador, caminho);
}

function criaValidador(parametros, schemaValidador, caminho) {
    const array = [];
    if (Array.isArray(schemaValidador)) {       // Verifico se é um array
        schemaValidador = schemaValidador[0];   // Pego o primeiro elemento
        caminho = caminho + '[]';
    }
    Object.keys(schemaValidador).forEach(propDoValidador => {   // Percorro o schema atual
        if (schemaValidador[propDoValidador] instanceof Object) // Verifico se o schema é um objeto
            criaValidador(parametros, schemaValidador[propDoValidador], `${caminho ? caminho + '.' : ''}${propDoValidador}`);   // Chamo novamente a função
        else {
            const response = _validaCampo(parametros, caminho, propDoValidador, schemaValidador[propDoValidador]);
            response && array.push(response);
        }
    });
    return array;
}

function _validaCampo(parametros, caminho, funcao, valorDaFuncao) {
    const arrayDeCaminhos = caminho.split('.');
    const find = findProperty(parametros, arrayDeCaminhos);

    // console.log('caminho', caminho);
    console.log('find', find);
}

function findProperty(params, path) {
    // console.log(params);
    try {
        // console.log('path', path);
        if (path.length > 1) {
            let removed = path.shift();
            if (removed.substr(-2) === '[]') {
                removed = removed.substr(0, removed.length - 2);
                // for()
            }
            // console.log('params[removed]', params[removed]);
            findProperty(params[removed], path);
        } else {
            console.log(path)
            return;
        }
    } catch (e) {
        console.log(e)
        // return undefined;
    }


    //     if (path.length) {
    //         let removed = path.pop();
    //         if(removed.substr(-2) === '[]') {
    //             removed = removed.substr(0, removed.length - 2);
    //         }
    //         console.log('params', params);
    //         console.log('removed', removed);
    //         console.log('path', path);
    //         return findProperty(params[removed], path);
    //     }
    //     return params;


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
    if (!value || value.length > paramValue)
        return {param: param, error: 'maxLength', message: `"${param}" deve ser <= ${paramValue}`};
    return false;
}

function minLenght(param, paramValue, value) {
    if (!value || value.length < paramValue)
        return {param: param, error: 'minLenght', message: `"${param}" deve ser => ${paramValue}`};
    return false;
}
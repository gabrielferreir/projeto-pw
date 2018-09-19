module.exports = validador;

function validador(parametros, schemaValidador, caminho) {
    const array = [];
    if (Array.isArray(schemaValidador)) {
        schemaValidador = schemaValidador[0];
        caminho = caminho + '[]';
    }
    Object.keys(schemaValidador).forEach(propDoValidador => {   // Percorro o schema atual
        if (schemaValidador[propDoValidador] instanceof Object) // Verifico se o schema é um objeto
            array.push(...validador(parametros, schemaValidador[propDoValidador], `${caminho ? caminho + '.' : ''}${propDoValidador}`));   // Chamo novamente a função
        else {
            const response = _validaCampo(parametros, caminho, propDoValidador, schemaValidador[propDoValidador]);
            response && array.push(response);
        }
    });
    return array;
}

function _validaCampo(parametros, caminho, funcao, valorDaFuncao) {
    console.log('ValidaCampo');
    // console.log('parametros', parametros);
    // console.log('caminho', caminho);
    // console.log('funcao', funcao);
    // console.log('valorDaFuncao', valorDaFuncao);
    const arrayDeCaminhos = caminho.split('.');
    const find = findProperty(parametros, arrayDeCaminhos) || [];
    const array = [];
    find.forEach(fin => {
        // console.log('fin', fin);
        const result = psol(fin, funcao, valorDaFuncao);
        if (result) array.push(result);
        // console.log('result', result);
    });

    // console.log('array', array);
    return array;
}

function psol(object, func, valueFunc) {
    return functions[func](object.path, valueFunc, object.value);
}

function findProperty(params, fullPath, path) {
    let itensQueDevemSerValidados = [];
    let backupFullPath = fullPath ? fullPath.slice() : [];
    path = path || fullPath;
    if (path.length > 1) {
        let removed = path.shift();
        if (removed.substr(-2) === '[]') {
            removed = removed.substr(0, removed.length - 2);
            const obj = params[removed] || [];
            obj.forEach(property => {
                itensQueDevemSerValidados.push({
                    path: path[0],
                    value: property[path[0]],
                    fullPath: backupFullPath.join('.')
                });
            })
        } else {
            findProperty(params[removed], backupFullPath, path);
        }
    } else {
        itensQueDevemSerValidados.push({path: path[0], value: params[path[0]], fullPath: backupFullPath.join('.')});
    }
    return itensQueDevemSerValidados;
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
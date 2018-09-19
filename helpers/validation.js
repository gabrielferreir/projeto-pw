module.exports = validador;

function validador(parametros, schemaValidador, caminho) {
    const array = [];
    if (Array.isArray(schemaValidador)) {
        schemaValidador = schemaValidador[0];
        caminho = caminho + '[]';
    }
    Object.keys(schemaValidador).forEach(propDoValidador => {
        if (schemaValidador[propDoValidador] instanceof Object)
            array.push(...validador(parametros, schemaValidador[propDoValidador], `${caminho ? caminho + '.' : ''}${propDoValidador}`));
        else {
            const response = _valida(parametros, caminho, propDoValidador, schemaValidador[propDoValidador]);
            response && response.length && array.push(...response);
        }
    });
    return array;
}

function _valida(parametros, caminho, funcao, valorDaFuncao) {
    const arrayPath = caminho.split('.');
    const find = findProperty(parametros, arrayPath) || [];
    const array = [];
    find.forEach((fin, index) => {
        const result = functions[funcao](fin.path, valorDaFuncao, fin.value);
        if (result) array.push({...result, fullPath: fin.fullPath, index: find.length > 1 ? index : undefined});
    });
    return array;
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
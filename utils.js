/**
 * 
 * @param {number} start 
 * @param {number} end 
 */
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

/**
 * @param {any} obj 
 * @returns Return either object is null or undefined
 */
function isNullOrUndefined(obj){
    return obj === null || obj === undefined;
}

/**
 * 
 * @param {number} n 
 */
function factorial(n){
    let num = 1;

    for(; n > 1; n--){
        num *= n * (--n);
    }

    return num;
}

/** @private @typedef {import("./types.d").VectorTypes} VectorTypes */

/** @param {VectorTypes} vector */
export function isVector1D(vector){
    return vector.hasOwnProperty('x');
}

/** @param {VectorTypes} vector */
export function isVector2D(vector){
    return vector.hasOwnProperty('x') && vector.hasOwnProperty('y');
}

/** @param {VectorTypes} vector */
export function isVector3D(vector){
    return vector.hasOwnProperty('x') && vector.hasOwnProperty('y') && vector.hasOwnProperty('z');
}

export {
    range,
    isNullOrUndefined
}

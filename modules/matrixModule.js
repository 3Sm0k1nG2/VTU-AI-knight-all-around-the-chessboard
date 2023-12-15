import { isVector3D, isVector2D, isVector1D } from "../utils.js";

/** @typedef {import("../types.d.js").VectorTypes} VectorTypes*/

/** @typedef {number} CoordinateLength - The length for a coordinate */

/**
 * @public 
 * @template T
 * @typedef MatrixModule<T>
 * 
 * @prop {VectorTypes} lengths 
 * @prop {(pos: VectorTypes) => T} get
 * @prop {(pos: VectorTypes, value: T) => void} set
 */

/** @param {CoordinateLength[]} vectors*/
function coordsLengthsShouldBePositiveGuard(vectors){
    if(Object.values(vectors).some(x => x < 0)){
        throw "Vector not positive. Expected value to be length";
    }
}

/** @typedef {import("../types.d.js").Matrix1D<T>} Matrix1D<T> */

/**
 * @template T
 * 
 * @param {VectorTypes} coordsLengths
 * @returns {Matrix1D<T>} A module to create matrix
 */
function createMatrix(coordsLengths){
    coordsLengthsShouldBePositiveGuard(coordsLengths);

    const matrix = []; 

    if(isVector3D(coordsLengths)){
        for(let x = 0; x < coordsLengths.x; x++){
            for(let y = 0; y < coordsLengths.y; y++){
                for(let z = 0; z < coordsLengths.z; z++){
                    matrix[z*coordsLengths.y*coordsLengths.x + y*coordsLengths.x + x] = undefined;
                }
            }
        }

        return matrix;
    }

    if(isVector2D(coordsLengths)){
        for(let x = 0; x < coordsLengths.x; x++){
            for(let y = 0; y < coordsLengths.y; y++){
                matrix[y*coordsLengths.x + x] = undefined;
            }
        }

        return matrix;
    }

    if(isVector1D(coordsLengths)){
        for(let x = 0; x < coordsLengths.x; x++){
            matrix[x] = undefined;
        }

        return matrix;
    }

    throw "Unsupported vector dimensions"
    // return [...range(0, coordsLengths.reduce((prev, next) => prev * next))]
}

/** 
 * @template T
 * 
 * @param {VectorTypes} coordsLengths
 * @returns {MatrixModule<T>} A module for matrix operations
 */
function createMatrixModule(coordsLengths){
    const matrix = createMatrix(coordsLengths);
    const lengths = {...coordsLengths};

    return {
        lengths,
        get: (pos) => {
            return matrix[(pos.z||0)*(lengths.y||0)*lengths.x + (pos.y||0)*lengths.x + pos.x];
        },
        set: (pos, value) => {
            matrix[(pos.z||0)*(lengths.y||0)*lengths.x + (pos.y||0)*lengths.x + pos.x] = {...value};
        }
    }
}

export {
    createMatrix,
    createMatrixModule
}


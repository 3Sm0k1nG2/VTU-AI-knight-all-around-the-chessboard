/** @typedef {import("./common").BoardPos} BoardPos */
const { matrixXLength, matrixYLength, getAvailableHorsePos} = require("./common");

/** 
 * @typedef MatrixCell
 * @prop {number} isFree
 * - Possible values:  
 * **0** - *Occupied*  
 * **1** - *Free*
 * @prop {number} availableNextPosCount
 */

const matrix = createMatrix(matrixXLength, matrixYLength);

function one2DMatrix() {
    // console.log(stringifyMatrix(matrix));

    doGameLogic(matrix);

    // console.log(stringifyMatrix(matrix));
}

/**
 * @param {MatrixCell[][]} matrix 
 */
function doGameLogic(matrix){
    for(let yI = 0; yI < matrix.length; yI++){
        for(let xI = 0; xI < matrix[yI].length; xI++){
            matrix[yI][xI].isFree = 0;

            for(let moves of getAvailableHorsePos(xI, yI, matrix[yI].length, matrix.length)){
                matrix[moves[1]][moves[0]].availableNextPosCount -= 1;
            }
        }
    }
}

/**
 * @param {number} xLength 
 * @param {number} yLength 
 */
function createMatrix(xLength, yLength){
    /** @type {MatrixCell[][]} */
    const matrix = [];

    for(let y = 0; y < yLength; y++){
        matrix[y] = [];
        for(let x = 0; x < xLength; x++){
            matrix[y][x] =  {
                isFree: 1,
                availableNextPosCount: getAvailableHorsePos(x, y, xLength, yLength).length,
            }
        }
    }

    return matrix;  
}

/** @arg {MatrixCell[][]} matrix */
function stringifyMatrix(matrix){
    return matrix.map(y => y.map(x => (x.isFree + "_" + x.availableNextPosCount)).join(" ")).join("\n");
}

module.exports = {
    one2DMatrix
}
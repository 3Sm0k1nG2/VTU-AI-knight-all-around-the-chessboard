/** @typedef {import("./common").BoardPos} BoardPos */
const { matrixXLength, matrixYLength, getAvailableHorsePos} = require("./common");

const occupiedMatrix = createOccupiedMatrix(matrixXLength, matrixYLength);
const neighboursMatrix = createNeighboursMatrix(matrixXLength, matrixYLength);

function two1DMatrices() {
    // console.log(stringifyMatrix(occupiedMatrix));
    // console.log(stringifyMatrix(neighboursMatrix));

    doGameLogic(occupiedMatrix,neighboursMatrix);

    // console.log(stringifyMatrix(occupiedMatrix));
    // console.log(stringifyMatrinode.x(neighboursMatrix));
}

/** 
 * @arg {number[][]} occupiedMatrix
 * @arg {number[][]} neighboursMatrix
 */
function doGameLogic(occupiedMatrix, neighboursMatrix){
    for(let y = 0; y < occupiedMatrix.length; y++){
        for(let x = 0; x < occupiedMatrix[y].length; x++){
            occupiedMatrix[y*occupiedMatrix[y].length + x] = 0;

            for(let moves of getAvailableHorsePos(x, y, occupiedMatrix[y].length, occupiedMatrix.length)){
                neighboursMatrix[moves[1]*occupiedMatrix[y].length + moves[0]] -= 1;
            }
        }
    }
}

/**
 * @arg {number} xLength
 * @arg {number} yLength 
 * 
 * @returns {number[][]} Boolean matrix with numbers
 * - Possible values:  
 * **0** - *Occupied*  
 * **1** - *Free*
 */
function createOccupiedMatrix(xLength, yLength) {
    const matrix = [];

    for(let y = 0; y < yLength; y++){
        for(let x = 0; x < xLength; x++){
            matrix[y*xLength + x] = 1;
        }
    }

    return matrix;  
}

/**
 * Number matrix  
 * Number corresponds to free cells for the next move 
 * 
 * @returns {number[][]} Number matrix
 */
function createNeighboursMatrix(xLength, yLength) {
    const matrix = [];

    for(let y = 0; y < yLength; y++){
        for(let x = 0; x < xLength; x++){
            matrix[y*xLength + x] =  getAvailableHorsePos(x, y, xLength, yLength).length;
        }
    }

    return matrix;
}

/** @arg {any[][]} matrix */
function stringifyMatrix(matrix){
    return matrix.map(y => y.join(" ")).join("\n");
}

module.exports = {
    two1DMatrices
}
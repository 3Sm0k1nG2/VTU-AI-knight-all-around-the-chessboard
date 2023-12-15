import { getAvailableHorsePos } from "./common.js";
import { BOARD_SQUARE_STATE_FREE } from "./types.d.js";

/**
 * @typedef BoardPos
 * @prop {number} x
 * @prop {number} y
 */

/** 
 * @typedef BoardSquare
 * @prop {BoardPos} pos
 * @prop {BoardSquareStates} state
 * @prop {BoardPos[]} nextFreePositions
 */

/**
 * @param {number} xLength 
 * @param {number} yLength 
 */
function createMatrix(xLength, yLength){
    /** @type {BoardSquare[]} */
    const matrix = [];

    for(let y = 0; y < yLength; y++){
        for(let x = 0; x < xLength; x++){
            matrix[y*xLength + x] =  {
                pos: {x,y},
                state: BOARD_SQUARE_STATE_FREE,
                nextFreePositions: getAvailableHorsePos(x, y, xLength, yLength),
            }
        }
    }

    return matrix;  
}

class Board {
    /**
     * @param {number} xLength 
     * @param {number} yLength 
     */
    constructor(xLength, yLength){
        /** @private */
        this._map = createMatrix(xLength, yLength);
        
        this.xLength = xLength;
        this.yLength = yLength;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    get(x, y) {
        return this._map[y*this.xLength + x];
    }
}

export {
    Board,
    createMatrix
}
import { getAvailableHorsePos } from "../common.js";
import { BOARD_SQUARE_STATE_FREE } from "../types.d.js";

/** 
 * @private 
 * @template T
 * @typedef {import("./matrixModule.js").MatrixModule<T>} MatrixModule<T>
 * */

/**
 * @private
 * @typedef {import("../types.d.js").BoardSquare} BoardSquare
 */

/** @typedef {MatrixModule<BoardSquare>} Board */

/** 
 * @param {MatrixModule<T>} matrixModule
 * @returns {Board} Matrix of BoardSquares
 */
function createBoardModule(matrixModule){
    return modifyMatrixToBoard(matrixModule);
}

/** 
 * @param {MatrixModule<T>} matrixModule
 * @returns {MatrixModule<BoardSquare>} Matrix of BoardSquares
 */
function modifyMatrixToBoard(matrixModule){
    /** @type {MatrixModule<BoardSquare>} */
    const board = matrixModule;

    let pos;
    let square;
    for(let x = 0; x < board.lengths.x; x++){
        for(let y = 0; y < board.lengths.y; y++){
            pos = {x,y};
            board.set(pos, {
                pos,
                state: BOARD_SQUARE_STATE_FREE,
                nextFreePositions: getAvailableHorsePos(x, y, board.lengths.x, board.lengths.y),
            });

            square = board.get(pos);
        }
    }

    return board;
}

/** 
 * @param {MatrixModule<T>} matrixModule
 * @returns {MatrixModule<BoardSquare>} Matrix of BoardSquares
 */
function new_modifyMatrixToBoard(matrixModule){
    /** @type {MatrixModule<BoardSquare>} */
    const board = matrixModule;

    for(let xI = 0; xI < board.lengths.x; xI++){
        for(let yI = 0; yI < board.lengths.y; yI++){
            board.get({x: xI, y: yI}).state = BOARD_SQUARE_STATE_FREE;
        }
    }

    return board;
}

export {
    createBoardModule
}
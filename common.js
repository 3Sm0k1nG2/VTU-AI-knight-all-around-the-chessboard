/** @private @typedef {import("./board").BoardPos} BoardPos*/

const matrixXLength = 8;
const matrixYLength = 8;

/** @type {BoardPos[]} */
const horseMovePosOffsets = [{x:2, y:1}, {x:1, y:2}, {x:-1, y:2}, {x:-2, y:1}, {x:-2, y:-1}, {x:-1, y:-2}, {x:1, y:-2}, {x:2, y:-1}];

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} rangeX 
 * @param {number} rangeY 
 * 
 * @returns {BoardPos[]} Available board pos
 */
function getAvailableHorsePos(x, y){
    return horseMovePosOffsets
        .map(pos => ({x: x + pos.x, y:y + pos.y}))
        .filter(pos => 
            pos.x < matrixXLength 
            && pos.x >= 0
            && pos.y < matrixYLength
            && pos.y >= 0
        );
}

export {
    matrixXLength,
    matrixYLength,
    getAvailableHorsePos,
}
/** @typedef {[x: number, y: number]} BoardPos - The position on the board */

const matrixXLength = 1000;
const matrixYLength = 1000;

/** @type {BoardPos[]} */
const horseMovePosOffsets = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];

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
        .map(pos => [x + pos[0], y + pos[1]])
        .filter(pos => 
            pos[0] < matrixXLength 
            && pos[0] >= 0
            && pos[1] < matrixYLength
            && pos[1] >= 0
        );
}

module.exports = {
    matrixXLength,
    matrixYLength,
    getAvailableHorsePos,
}
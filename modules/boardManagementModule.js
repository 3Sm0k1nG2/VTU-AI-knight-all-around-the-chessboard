/** @private @typedef {import("../types.d.js").VectorTypes} VectorTypes */

/** @private @typedef {import("./boardModule.js").Board} Board */
/** @private @typedef {import("./boardModule.js").BoardSquare} BoardSquare */

/** @private @typedef {import("../types.d").View} View*/

/**
 * @typedef BoardManagementModule
 * 
 * @prop {(board: Board) => void} changeBoard
 * @prop {(view: View) => void} changeView
 * @prop {(pos: VectorTypes) => boolean} occupy
 * @prop {(pos: VectorTypes) => BoardSquare} peek
 */

/**
 * @param {Board} board 
 * @param {View} view
 * @returns {BoardManagementModule} Module that manages board and its view
 */
function createBoardManagementModule(board, view){
    const _board = board;
    const _view = view;

    return {
        changeBoard: (board) => {
            _board = board;
            _view.update();
        },
        
        changeView: (view) => {
            _view = view;
        },

        peek: (pos) => {
            return _board.get(pos);
        },

        occupy: (pos) => {
            let square = _board.get(pos);

            if(square.state === BOARD_SQUARE_STATE_OCCUPIED){
                throw "Square occupied.";
            }

            square.state = BOARD_SQUARE_STATE_OCCUPIED;

            /** @type {BoardSquare} */
            let nextSquare;
            for(let nextPos of square.nextFreePositions){
                nextSquare =  _board.get(nextPos);

                nextSquare.state = BOARD_SQUARE_STATE_NEXT;
                nextSquare.nextFreePositions.splice(nextSquare.nextFreePositions.findIndex(pos => pos.x === square.pos.x && pos.y === square.pos.y), 1);
            }

            let posToUpdate = [{...pos}, ...square.nextFreePositions];
            // square.nextFreePositions = [];

            _view.update(posToUpdate);

            return true;
        },
    }
}
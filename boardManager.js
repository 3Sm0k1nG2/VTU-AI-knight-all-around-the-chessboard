/** @typedef {import("./views/boardView.js").BoardView} BoardView */

import { createBoardModule } from "./modules/boardModule.js";
import { createMatrixModule } from "./modules/matrixModule.js";
import { BOARD_SQUARE_STATE_NEXT, BOARD_SQUARE_STATE_OCCUPIED } from "./types.d.js";

class BoardManager {
    /** @param {BoardView} boardView */
    constructor(boardView){
        this.boardView = boardView;
    }

    /** @param {Board} board */
    setBoard = (board) => {
        /** @type {Board} */
        this.board = board;
        this.boardView.update();
    }
    
    /** @param {BoardView} boardView */
    setBoardView = (boardView) => {
        this.boardView = boardView;
    }

    /** @type {(pos: VectorTypes) => BoardSquare} */
    peek = (pos) => {
        return this.board.get(pos);
    }

    /** @type {(pos: VectorTypes) => boolean} */
    occupy = (pos) => {
        let square = this.board.get(pos);

        if(square.state === BOARD_SQUARE_STATE_OCCUPIED){
            throw "Square occupied.";
        }

        square.state = BOARD_SQUARE_STATE_OCCUPIED;

        /** @type {BoardSquare} */
        let nextSquare;
        for(let nextPos of square.nextFreePositions){
            nextSquare =  this.board.get(nextPos);

            nextSquare.state = BOARD_SQUARE_STATE_NEXT;
            nextSquare.nextFreePositions.splice(nextSquare.nextFreePositions.findIndex(pos => pos.x === square.pos.x && pos.y === square.pos.y), 1);
        }

        // square.nextFreePositions = [];
        this.boardView.addToUpdateQueue(pos, ...square.nextFreePositions);
        this.boardView.update();

        return true;
    }

    /** @type {() => void} */
    reset = () => {
        this.board = createBoardModule(createMatrixModule({x: this.board.lengths.x, y: this.board.lengths.y}))
        this.boardView.changeBoard(this.board);
        this.boardView.update();
    }

}

export {
    BoardManager
}
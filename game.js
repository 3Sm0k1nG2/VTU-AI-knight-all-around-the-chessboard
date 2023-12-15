/** @typedef {import('./board').ChessBoard} ChessBoard*/
/** @typedef {import('./board').BoardPos} BoardPos*/
/** @typedef {import('./boardManager').BoardManager} BoardManager*/

/** 
 * @typedef HistoryMove
 * @prop {Object} target
 * @prop {BoardPos} target.pos
 * @prop {boolean} target.state === BOARD_SQUARE_STATE_OCCUPIED
 * @prop {BoardPos[]} target.nextFreePositions
 * @prop {BoardPos | null} lastPlacedPos
 */

class Game {
    /** @arg {BoardManager} boardManager */
    constructor(boardManager){
        /** @private */
        this.boardManager = boardManager;
        /** @public @type {BoardPos | null} */
        this.lastPlacedPos = null;
        /** @type {HistoryMove[]} */
        this.movesHistory = [];

        this.nonOccupiedCount = this.boardManager.board.xLength * this.boardManager.board.yLength;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    place = (x, y) => {
        if(!this.boardManager.occupy(x, y)){
            return false;
        }

        this.movesHistory.push({
            target: {
                pos: this.boardManager.board.get(x,y).pos,
                isOccupied: this.boardManager.board.get(x,y).state === BOARD_SQUARE_STATE_OCCUPIED,
                nextFreePositions: [...this.boardManager.board.get(x,y).nextFreePositions]
            }
        })
        this.lastPlacedPos = {x,y};

        this.nonOccupiedCount--;

        console.log(this.movesHistory);
    }

    resetBoard = () => {
        this.boardManager.board.reset();
        this.boardManager.boardView.update();

        this.movesHistory = [];
        this.lastPlacedPos = null;
        this.nonOccupiedCount = this.boardManager.board.xLength * this.boardManager.board.yLength;
    }

    back = () => {
        const move = this.movesHistory.pop();
        
        const square = this.boardManager.board.get(move.target.pos.x,move.target.pos.y);

        square.pos = move.target.pos;
        square.state = move.target.state;
        square.nextFreePositions = [...move.target.nextFreeSquares];

        this.lastPlacedPos = move.lastPlacedPos;

        this.nonOccupiedCount++;

        this.boardManager.boardView.update([{...move.target.pos}, ...square.nextFreePositions])

        if(this.movesHistory.length > 0){
            this.place(move.lastPlacedPos.x, move.lastPlacedPos.y)
        }
    }
}

export {
    Game
}
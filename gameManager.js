import { matrixXLength, matrixYLength } from "./common.js";
import { BOARD_SQUARE_STATE_NEXT, BOARD_SQUARE_STATE_OCCUPIED } from "./types.d.js";
import { isNullOrUndefined } from "./utils.js";

/** @private @typedef {import("./boardManager").BoardManager} BoardManager*/
/** @private @template T @typedef {import("./main").HistoryModuleType<T>} HistoryModuleType<T> */
/** @private @typedef {import("./types.d").BoardSquareStates} BoardSquareStates */
/** @private @typedef {import("./types.d").GameSession} GameSession */


/**
 * @typedef {Object} HistoryMove
 * 
 * @prop {{
*      pos: VectorTypes;
*      state: BoardSquareStates;
*      nextFreeSquares: BoardSquare[];
* }} target
* @prop {VectorTypes | null} lastPlacedPos
*/

class GameManager {
    /** 
     * @param {BoardManager} boardManager
     * @param {HistoryModuleType<HistoryMove>} historyModule
     */
    constructor(boardManager, historyModule) {
        this.boardManager = boardManager;
        this.historyModule = historyModule;

        this.nonOccupiedCount = matrixXLength * matrixYLength;
    }

    /** @type {(gameSession: GameSession) => void} */
    setGameSession = (gameSession) => {
        this.gameSession = gameSession;
    }

    /** @type {(pos: VectorTypes) => boolean} */
    place = (pos) => {
        const square = this.boardManager.peek(pos);

        /** @type {HistoryMove} */
        const move = {
            target: {
                pos: square.pos,
                state: square.state,
                nextFreeSquares: square.nextFreePositions.map(p => ({...this.boardManager.peek(p), nextFreePositions: [...this.boardManager.peek(p).nextFreePositions]}))
            },
            lastPlacedPos: this.historyModule.peek()
        }

        if(this.boardManager.peek(pos).state === BOARD_SQUARE_STATE_OCCUPIED){
            return false;
        }
        if(this.boardManager.peek(pos).state !== BOARD_SQUARE_STATE_NEXT && !isNullOrUndefined(this.historyModule.peek())){
            return false;
        }

        if(!isNullOrUndefined(this.historyModule.peek())){
            const move = this.historyModule.peek();
            for(let {pos, state} of move.target.nextFreeSquares){
                this.boardManager.peek(pos).state = state; 
            }
        }

        this.boardManager.occupy(pos)

        this.historyModule.push(move);

        this.nonOccupiedCount--;

        console.log(this.historyModule);
    }

    /** @type {() => void} */
    reset = () => {
        this.boardManager.reset();
        this.boardManager.boardView.update();

        this.historyModule.clear();
        this.nonOccupiedCount = this.boardManager.board.xLength * this.boardManager.board.yLength;
    }

    back = () => {
        const move = this.historyModule.pop();

        const square = this.boardManager.peek(move.target.pos);

        // square.pos = move.target.pos;
        square.state = move.target.state;
        square.nextFreePositions = move.target.nextFreeSquares.map(p => p.pos);

        let actualSquare;
        for(let square of move.target.nextFreeSquares){
            actualSquare = this.boardManager.peek(square.pos);
            actualSquare.nextFreePositions.push(move.target.pos);
            actualSquare.state = square.state;
        }

        this.nonOccupiedCount++;

        this.boardManager.boardView.update([{...move.target.pos}, ...square.nextFreePositions]);
        
        let prevMove;
        if(!isNullOrUndefined(prevMove = this.historyModule.peek())){
            for(let square of prevMove.target.nextFreeSquares){
                this.boardManager.peek(square.pos).state = BOARD_SQUARE_STATE_NEXT;
            }
            this.boardManager.boardView.update([{...prevMove.target.pos}, ...prevMove.target.nextFreeSquares.map(x => x.pos)])
        }
    }
}

export {
    GameManager
}
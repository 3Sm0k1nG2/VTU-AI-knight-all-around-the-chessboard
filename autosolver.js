import { BOARD_SQUARE_STATE_OCCUPIED } from "./types.d.js";

/** @private @typedef {import("./gameManager.js").GameManager} GameManager */

function solveWithDelay(solveFunc, delayMs){
    setTimeout(() => {
        solveFunc();
        solveWithDelay(solveFunc, delayMs);
    }, delayMs);
}

class AutoSolver {
    /** @param {GameManager} gameManager */
    setGameManager = (gameManager) => {
        if(!gameManager.lastPlacedPos){
            for(let y = 0; y < gameManager.boardManager.board.yLength; y++){
                for(let x = 0; x < gameManager.boardManager.board.xLength; x++){
                    if(gameManager.boardManager.peek({x, y}).state === BOARD_SQUARE_STATE_OCCUPIED){
                        throw "Board found occupied square. LastMovePos not defined."
                    }
                }
            }
        }

        this.gameManager = gameManager;
    }

    solveNext = () => {
        if(this.gameManager.nonOccupiedCount === 0){
            return true;
        }

        const lastMove = this.gameManager.historyModule.peek();

        if(!lastMove){
            this.gameManager.place({
                x: Math.floor((Math.random()*this.gameManager.boardManager.board.lengths.x) % this.gameManager.boardManager.board.lengths.x)
                ,y: Math.floor((Math.random()*this.gameManager.boardManager.board.lengths.y) % this.gameManager.boardManager.board.lengths.y)
            });
            return;
        }

        let boardSquare = this.gameManager.boardManager.peek(lastMove.target.pos);
        let nextSquare = boardSquare.nextFreePositions
            .map(pos => this.gameManager.boardManager.peek(pos))
            .filter(x => !(x.state === BOARD_SQUARE_STATE_OCCUPIED))
            .sort((a,b) => a.nextFreePositions.length - b.nextFreePositions.length)[0]

        this.gameManager.place(nextSquare.pos);
        
        return;
    }
}

export {
    AutoSolver
}
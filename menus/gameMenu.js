import { createGameMenuView } from "../views/menus/gameMenuView.js"

/** @private @typedef {import("../boardView.old.js").BoardView} BoardView*/
/** @private @typedef {import("../game").Game} Game*/

/** @private @typedef {import("../main.js").AutoSolver} AutoSolver*/

class GameMenu {
    /** 
     * @param {GameManager} gameManager
     * @param {AutoSolver} autoSolver
     */
    constructor(gameManager, autoSolver){
        this.gameManager = gameManager;
        this.autoSolver = autoSolver;

        this.view = createGameMenuView(gameManager.boardManager.boardView, this.resetBoard, this.autosolve, this.back);
    }

    resetBoard = () => {
        this.gameManager.reset();
    }

    /** @param {UInt} delayMs */
    autosolve = (delayMs = 0) => {
        setTimeout(this.autoSolver.solveNext, delayMs);
    }

    back = () => {
        this.gameManager.back();
    }
}

export {
    GameMenu
}
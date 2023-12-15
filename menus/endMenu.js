import { createEndMenuView } from '../views/menus/endMenuView.js';

/** @private @typedef {import('../appManager').MenuManager} MenuManager */

class EndMenu {
    /** @param {MenuManager} menuManager */
    constructor(menuManager){
        this.menuManager = menuManager;

        this.view = createEndMenuView(this.endGame);
    }

    endGame = () => {
        this.menuManager.changeMenu("game");
    }
}

export {
    EndMenu
}
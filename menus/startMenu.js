import { createStartMenuView } from '../views/menus/startMenuView.js';

/** @private @typedef {import('../menuManager.js').MenuManager} MenuManager */

class StartMenu {
    /** @param {MenuManager} menuManager */
    constructor(menuManager){
        this.menuManager = menuManager;

        this.view = createStartMenuView(this.startGame);
    }

    startGame = () => {
        this.menuManager.changeMenu("game");
    }
}

export {
    StartMenu
}
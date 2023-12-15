/** @private @typedef {import("./menuManager").MenuManager} MenuManager*/

class AppManager {
    /**
     * @param {HTMLElement} root
     * @param {MenuManager} menuManager
     */
    constructor(root, menuManager){
        this.root = root;
        this.menuManager = menuManager;
    }
}

export {
    AppManager
}
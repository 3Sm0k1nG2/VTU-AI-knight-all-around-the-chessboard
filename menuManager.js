class MenuManager {
    /** @param {HTMLElement} root */
    constructor(root){
        this.root = root;
    }

    /** @type {(menus: MenuDictionary) => void} */
    setMenus = (menus) => {
        this.menus = menus;
    }

    /** @param {"start" | "game" | "end"} menu */
    changeMenu(menu) {
        for(let child of this.root.childNodes){
            this.root.removeChild(child)
        }
        this.root.append(this.menus[menu].view.render());
    }
}

export {
    MenuManager
}
/** @private @typedef {import('../boardView').BoardView} BoardView */

/**
 * @param {BoardView} boardView 
 * @param {() => void} resetAction 
 * @param {() => void} solveAction 
 * @param {() => void} backAction 
 * @returns {RenderableView}
 */
function createGameMenuView(boardView, resetAction, solveAction, backAction) {
    const htmlElement = document.createElement('div');
    htmlElement.append(boardView.render());

    const actions = document.createElement('div');
    actions.id = 'actions';

    htmlElement.appendChild(actions);
    
    /** @type {HTMLButtonElement} */
    let button = null;

    button = document.createElement('button');
    button.addEventListener('click', backAction);
    button.textContent = 'Back';
    
    actions.appendChild(button);
    
    button = document.createElement('button');
    button.addEventListener('click', solveAction);
    button.textContent = 'Autosolve';
    
    actions.appendChild(button);
    
    button = document.createElement('button');
    button.addEventListener('click', resetAction);
    button.textContent = 'Reset Board';
    
    actions.appendChild(button);

    return {
        render: () => htmlElement
    };
}

const startMenuHtml = `` +
    `<div id="actions">` +
        `<BoardView/>` +
        `<button click="{{backAction}}">Back</button>` +
        `<button click="{{solveAction}}">Autosolve</button>` +
        `<button click="{{resetAction}}">Reset Board</button>` +
    `</div>`;

export {
    createGameMenuView
}

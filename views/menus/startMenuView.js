/**
 * @param {BoardView} boardView 
 * @param {() => void} startAction 
 * @returns {RenderableView}
 */
function createStartMenuView(startAction) {
    const actions = document.createElement('div');
    actions.id = 'actions';
    
    const button = document.createElement('button');
    button.addEventListener('click', startAction);
    button.textContent = 'Start Game';
    
    actions.appendChild(button);

    return {
        render: () => actions
    };
}

const startMenuView = `` +
    `<div id="actions">` +
        `<button click="{{startAction}}">Start Game</button>` +
    `</div>`;

export {
    createStartMenuView
}

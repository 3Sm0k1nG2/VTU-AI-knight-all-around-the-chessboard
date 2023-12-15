/**
 * @param {BoardView} boardView 
 * @param {() => void} endAction 
 * @returns {RenderableView}
 */
function createEndMenuView(endAction) {
    const actions = document.createElement('div');
    actions.id = 'actions';
    
    const button = document.createElement('button');
    button.addEventListener('click', endAction);
    button.textContent = 'Play again';
    
    actions.appendChild(button);

    return {
        render: () => actions
    };
}

const endMenuView = `` +
    `<div id="actions">` +
        `<button click="{{endAction}}">End Game</button>` +
    `</div>`;

export {
    createEndMenuView
}

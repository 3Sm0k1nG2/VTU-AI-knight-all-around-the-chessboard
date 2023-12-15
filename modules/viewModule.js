/** @private @typedef {import("../types.d").View} View*/

/** @param {View} view*/
function createViewModule(view) {
    const _view = view;

    return {
        render: () => {
            _view.render();
        },

        update: () => {
            _view.update();
        }
    }
}
import { BOARD_SQUARE_STATE_OCCUPIED, BOARD_SQUARE_STATE_NEXT, BOARD_SQUARE_STATE_FREE } from "../types.d.js";
import { isNullOrUndefined, range } from "../utils.js";


function createHeaderRowHtml(){
    const headerRow = ["a","b","c","d","e","f","g","h"];

    const headerRowHtml = `<thead class="row">` +
        `<tr>`+
        headerRow.map(h => `<th>${h}</th>`).join('') +
        `</tr>` +
        `</thead>`;

    return headerRowHtml;
}

function createHeaderColHtml(){
    const headerCol = ["8","7","6","5","4","3","2","1"];
    
    const headerColHtml = `<thead class="col">` +
        headerCol.map(h => `<tr><th>${h}</th></tr>`).join('') +
        `</thead>`;

    return headerColHtml;
}

function createHeaderDivider(){
    const headerCol = "&emsp13;";
    
    const headerColHtml = `<thead class="divider">` +
        `<tr><th>${headerCol}</th></tr>` +
        `</thead>`;

    return headerColHtml;
}

/**
 * @param {Board} board 
 */
function createTableFromMatrixHtml(board){
    const tableHtml = `<tbody>` +
        `${[...range(0, board.lengths.y-1)].map(y => `<tr>${[...range(0, board.lengths.x-1)].map(x => `<td>${board.get({x,y}).nextFreePositions.length}</td>`).join('')}</tr>`).join('')}` +
        `</tbody>`;

    return tableHtml;
}

/** 
 * @param {Board} board
 * @param {Set<BoardViewHeader>} headers
 */
function createBoardTable(board, headers = []){
    const htmls = [];

    if(headers.has("top")){
        if(headers.has("left")){
            htmls.push(createHeaderDivider());
        }

        htmls.push(createHeaderRowHtml());

        if(headers.has("right")){
            htmls.push(createHeaderDivider());
        }
    }

    if(headers.has("left")){
        htmls.push(createHeaderColHtml());
    }

    htmls.push(createTableFromMatrixHtml(board));

    if(headers.has("right")){
        htmls.push(createHeaderColHtml());
    }

    if(headers.has("bottom")){
        if(headers.has("left")){
            htmls.push(createHeaderDivider());
        }

        htmls.push(createHeaderRowHtml());

        if(headers.has("right")){
            htmls.push(createHeaderDivider());
        }
    }

    const boardTableHtml = `<table class="board">` +
        htmls.join('') +
        `</table>`;

    return boardTableHtml;
}

/** @typedef {"left" | "top" | "right" | "bottom"} BoardViewHeader*/

/** @private @typedef {import("../types.d.js").View} View*/
/** @private @typedef {import("../modules/boardModule.js").Board} Board */
/** @private @typedef {import("../types.d.js").VectorTypes} VectorTypes*/



/** 
 * @private
 * @template T
 * @typedef {import("../types.d.js").HistoryModule<T>} HistoryModule<T>
 */

/**
 * @private @typedef {VectorTypes}
 */

/** 
 * @typedef {( View & {
*      changeBoard: (board: Board) => void,
*      addToUpdateQueue: (...positions: VectorTypes) => void,
* })} BoardView
*/

/**
 * @param {HistoryModule<VectorTypes>} historyNextModule
 * @param {HistoryModule<VectorTypes>} historyUpdateModule
 * @param {Board} board 
 * @param {() => void} clickAction 
 * @param {() => void} mouseoverAction 
 * @param {Set<BoardViewHeader>} headers 
 * @returns {BoardView}
 */
function createBoardView(historyNextModule, historyUpdateModule, board, clickAction, mouseoverAction, headers = []) {
    const table = document.createElement('table'); 
    table.innerHTML = createBoardTable(board, headers);
    table.className = 'board';

    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.addEventListener('click', clickAction);
    tbody.addEventListener('mouseover', mouseoverAction);

    let _board = board;

    const _historyNextStateModule = historyNextModule;
    const _historyUpdateModule = historyUpdateModule;

    function clearOldMoves(){
        let pos = null;
        while(!isNullOrUndefined(pos = _historyNextStateModule.pop())){
            tbody.rows[pos.y].cells[pos.x].classList.remove(BOARD_SQUARE_STATE_NEXT);
        }
    }

    return {
        changeBoard: (board) => {
            _board = board;
        },

        addToUpdateQueue: (...positions) => {
            _historyUpdateModule.push(...positions);
        },

        update: () => {
            if(isNullOrUndefined(_historyUpdateModule.peek())){
                _historyUpdateModule.push(...[...range(0, 63)].map(x => ({x:x%8,y:Math.floor(x/8)})));
            }

            clearOldMoves();

            /** @type {BoardSquare} */
            let square = null;
            /** @type {HTMLTableCellElement} */
            let tbodyRowCell = null;

            let pos;
            while(!isNullOrUndefined(pos = _historyUpdateModule.pop())){
                square = _board.get(pos);
                tbodyRowCell = tbody.rows[pos.y].cells[pos.x];
                
                tbodyRowCell.textContent = square.nextFreePositions.length;

                switch(square.state){
                    case BOARD_SQUARE_STATE_OCCUPIED: {
                        tbodyRowCell.classList.remove(BOARD_SQUARE_STATE_NEXT);

                        tbodyRowCell.classList.add(BOARD_SQUARE_STATE_OCCUPIED);

                        break;
                    }
                    case BOARD_SQUARE_STATE_NEXT: {
                        tbodyRowCell.classList.remove(BOARD_SQUARE_STATE_OCCUPIED);

                        tbodyRowCell.classList.add(BOARD_SQUARE_STATE_NEXT);
                        _historyNextStateModule.push(pos);
                        
                        break;
                    }
                    case BOARD_SQUARE_STATE_FREE: {
                        tbodyRowCell.classList.remove(BOARD_SQUARE_STATE_OCCUPIED, BOARD_SQUARE_STATE_NEXT);
                        
                        break;
                    }
                }
            }
        },
        render: () => table
    };
}

const boardView = `` +
    `<table>` +
        `<theader class="divider">...</theader>` +
        `<theader class="row">...</theader>` +
        `<theader class="divider">...</theader>` +
        `<theader class="col">...</theader>` +
        `<tbody>...</tbody>` +
        `<theader class="col">...</theader>` +
        `<theader class="divider">...</theader>` +
        `<theader class="row">...</theader>` +
        `<theader class="divider">...</theader>` +
    `</table>`;

export {
    createBoardView
}

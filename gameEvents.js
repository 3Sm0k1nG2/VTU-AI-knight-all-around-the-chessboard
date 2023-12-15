import { BOARD_SQUARE_STATE_OCCUPIED } from "./types.d.js";
import { isNullOrUndefined } from "./utils.js";

/** 
 * @param {MouseEvent & {target: HTMLTableCellElement}} e
 * @param {ChessBoard} board
 * @param {BoardPos[]} nextCells
 */
function decreaseHorsePos(e, board, nextCells){
    if(e.target.tagName.toLocaleLowerCase() !== 'td'){
        return;
    }

    movesHistory.push([e.target.cellIndex-1, e.target.parentElement.rowIndex])
    console.log(movesHistory);
    e.target.textContent = 'H';
    board[e.target.parentElement.rowIndex*board.xLength + e.target.cellIndex-1] = -2;

    if(!e.target.style.backgroundColor || e.target.style.backgroundColor !== "blue"){
        e.target.style.backgroundColor = "blue";
        e.target.style.color = "white";
    }

    clearNextCells(nextCells);

    let posArr = getAvailableHorsePos(e.target.cellIndex-1, e.target.parentElement.rowIndex, e.target.parentElement.cells.length-1, e.target.parentElement.parentElement.rows.length-1);
    for(let pos of posArr){
        if(board[pos.y*board.xLength + pos.x] === -2){
            tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "blue";
            tableElement.rows[pos.y].cells[pos.x+1].style.color = "white";
            continue;
        }

        board[pos.y*board.xLength + pos.x] = board[pos.y*board.xLength + pos.x] > 0 ? board[pos.y*board.xLength + pos.x]-1 : 0;
        tableElement.rows[pos.y].cells[pos.x+1].textContent = board[pos.y*board.xLength + pos.x];

        if(board[pos.y*board.xLength + pos.x] === 0){
            tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "red";
            continue;
        }

        tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "cyan";
        nextCells.push(pos);
    }
}

/** 
 * @param {MouseEvent & {target: HTMLTableCellElement}} e
 * @param {ChessBoard} board
 * @param {BoardPos[]} nextCells
 * @param {BoardPos[]} markedCells
 */
function showHorsePos(e, board, nextCells, markedCells){
    if(e.target.tagName.toLowerCase() !== "td"){
        return;
    }

    clearMarkedCells(markedCells);
    showNextCells(nextCells);

    let posArr = getAvailableHorsePos(e.target.cellIndex-1, e.target.parentElement.rowIndex, e.target.parentElement.cells.length-1, e.target.parentElement.parentElement.rows.length-1);
    for(let pos of posArr){
        if(tableElement.rows[pos.y].cells[pos.x+1].tagName.toLowerCase() !== "td"){
            return;
        }

        if(board[pos.y*board.xLength + pos.x] == -2){
            tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "blue";
            tableElement.rows[pos.y].cells[pos.x+1].style.color = "white";
            continue;
        }

        if(nextCells.find(p => p[0] === pos.x && p[1] === pos.y)){
            tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "cyan";
            continue;
        }

        if(board[pos.y*board.xLength + pos.x] == 0){
            tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "red";
            continue;
        }

        tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "yellow";
        markedCells.push(pos);
    }
}

/** @private @typedef {import("./types.d.js").VectorTypes} VectorTypes */

/**
 * @param {HTMLTableSectionElement} tableRow
 */
function getActualTableRow(tableRow){
    let i = -1;
    for(let child of tableRow.parentElement.children){
        i++

        if(child === tableRow){
            return i;
        }
    }

    throw "Could not retrieve row index"
}

/** 
 * @param {GameManager} gameManager
 * @param {HistoryModuleType<VectorTypes} historyModule
 * @param {MouseEvent & {target: HTMLTableCellElement}} e
 */
function clickAction(gameManager, historyModule, e){
    const _gameManager = gameManager;
    const _historyModule = historyModule;

    /**
     * 
     * @param {HTMLTableSectionElement} tbody 
     * @param {VectorTypes[]} positions 
     */
    function clearOldMoves(tbody){
        let pos;
        while(!isNullOrUndefined(pos = _historyModule.pop())){
            tbody.rows[pos.y].cells[pos.x].classList.remove('hover-next');
        }
    }

    return ((e) => {
        if(e.target.tagName.toLocaleLowerCase() !== 'td'){
            return;
        }
    
        clearOldMoves(e.target.parentElement.parentElement);

        _gameManager.place({x: e.target.cellIndex, y: getActualTableRow(e.target.parentElement)})
    })(e);
}

/** 
 * @param {BoardManager} boardManager
 * @param {HistoryModuleType<VectorTypes>} historyModule
 * @param {MouseEvent & {target: HTMLTableCellElement}} e
 */
function mouseoverAction(boardManager, historyModule, e){
    const _boardManager = boardManager;
    const _historyModule = historyModule;

    /**
     * 
     * @param {HTMLTableSectionElement} tbody 
     * @param {VectorTypes[]} positions 
     */
    function clearOldMoves(tbody){
        let pos = undefined;

        while(!isNullOrUndefined(pos = _historyModule.pop())){
            tbody.rows[pos.y].cells[pos.x].classList.remove('hover-next');
        }
    }

    /**
     * 
     * @param {HTMLTableSectionElement} tbody 
     * @param {VectorTypes[]} positions 
     */
    function markNextMoves(tbody, positions){
        for(let pos of positions){
            // To NOT overide 'occupied' cells
            if(tbody.rows[pos.y].cells[pos.x].classList.contains(BOARD_SQUARE_STATE_OCCUPIED)){
                continue;
            }

            // To NOT overide 'next' cells
            // if(tbody.rows[pos.y].cells[pos.x].classList.contains(BOARD_SQUARE_STATE_NEXT)){
            //     continue;
            // }

            tbody.rows[pos.y].cells[pos.x].classList.add('hover-next');
            _historyModule.push(pos);
        }
    }

    /** @param {MouseEvent & {target: HTMLTableCellElement}} e */
    return ((e) => {
        if(e.target.tagName.toLowerCase() === "tbody"){
            clearOldMoves(e.target)
        }
        if(e.target.tagName.toLowerCase() !== "td"){
            return;
        }

        /** @type {HTMLTableSectionElement} */
        const tbody = e.target.parentElement.parentElement;
        
        clearOldMoves(tbody);

        if(e.target.classList.contains("occupied")){
            return;
        }

        const square = _boardManager.board.get({x: e.target.cellIndex, y: getActualTableRow(e.target.parentElement)});
        markNextMoves(tbody, square.nextFreePositions);
    })(e);
}



export {
    clickAction,
    mouseoverAction
}
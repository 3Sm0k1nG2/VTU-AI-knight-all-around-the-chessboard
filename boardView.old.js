import { range } from "./utils.js"

/** @private @typedef {import("./board.js").ChessBoard} ChessBoard*/
/** @private @typedef {import("./board.js").BoardPos} BoardPos*/

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
 * @param {ChessBoard} board 
 */
function createTableFromMatrixHtml(board){
    const tableHtml = `<tbody>` +
        `${[...range(0, board.yLength-1)].map(y => `<tr>${[...range(0, board.xLength-1)].map(x => `<td>${board.get(x,y).nextFreePositions.length}</td>`).join('')}</tr>`).join('')}` +
        `</tbody>`;

    return tableHtml;
}

/** 
 * @param {Set<BoardViewHeader>} headers
 * @param {ChessBoard} board
 */
function createBoardTable(headers, board){
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

class BoardView {
    /** 
     * @param {HTMLElement} htmlRef
     * @param {ChessBoard} board
     * @param {Set<BoardViewHeader> | null} headers
     */
    constructor(htmlRef, board, headers = null){
        this.board = board;
        /** @type {HTMLTableElement} */
        this.htmlRef = htmlRef;

        /** @type {Set<BoardViewHeader>} */
        this.headersToShow = new Set();

        if(headers){
            this.showHeaders(headers);
        }

        this.htmlRef.innerHTML = createBoardTable(this.headersToShow, this.board);
        this.addEventListener = this.htmlRef.addEventListener;
        this.tbody = this.htmlRef.getElementsByTagName('tbody')[0];
    }

    /** @param {Set<BoardViewHeader>} headers*/
    showHeaders(headers) {
        for(let h of headers){
            this.headersToShow.add(h);
        }
    }

    /** @param {Set<BoardViewHeader>} headers*/
    hideHeaders(headers) {
        for(let h of headers){
            this.headersToShow.delete(h);
        }
    }

    /** @param {BoardPos[] | null} positions*/
    update(positions = null){
        if(!positions){
            this.htmlRef.innerHtml = createBoardTable(this.headersToShow, this.board);
            return;
        }

        if(!this.tbody){
            this.tbody = this.htmlRef.getElementsByTagName('tbody')[0];
        }

        /** @type {BoardSquare} */
        let square = null;
        /** @type {HTMLTableCellElement} */
        let tbodyRowCell = null;
        for(let {x, y} of positions){
            square = this.board.get(x,y);
            tbodyRowCell = this.tbody.rows[y].cells[x];
            
            tbodyRowCell.textContent = square.nextFreePositions.length;

            if(square.state === BOARD_SQUARE_STATE_OCCUPIED){
                tbodyRowCell.className = BOARD_SQUARE_STATE_OCCUPIED;
            }
        }
    }
}

export {
    BoardView
}
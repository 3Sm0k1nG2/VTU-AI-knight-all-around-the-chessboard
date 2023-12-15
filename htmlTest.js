
/** @typedef {import("./board").ChessBoard} ChessBoard*/



const matrixXLength = 8;
const matrixYLength = 8;

/** @type {BoardPos[]} */
const horseMovePosOffsets = [{x:2, y:1}, {x:1, y:2}, {x:-1, y:2}, {x:-2, y:1}, {x:-2, y:-1}, {x:-1, y:-2}, {x:1, y:-2}, {x:2, y:-1}];

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} rangeX 
 * @param {number} rangeY 
 * 
 * @returns {BoardPos[]} Available board pos
 */
function getAvailableHorsePos(x, y){
    return horseMovePosOffsets
        .map(pos => [x + pos[0], y + pos[1]])
        .filter(pos => 
            pos[0] < matrixXLength 
            && pos[0] >= 0
            && pos[1] < matrixYLength
            && pos[1] >= 0
        );
}


/**
 * @param {number} xLength 
 * @param {number} yLength 
 */
function createMatrix(xLength, yLength){
    /** @type {BoardSquare[]} */
    const matrix = [];

    for(let y = 0; y < yLength; y++){
        for(let x = 0; x < xLength; x++){
            matrix[y*xLength + x] =  {
                isOccupied: false,
                nextFreePositions: getAvailableHorsePos(x, y, xLength, yLength),
            }
        }
    }

    return matrix;  
}


function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

/**
 * @param {number} x 
 * @param {number} y 
 */
function getBoardMapLocation(map, xLength, x, y) {
    return map[y*xLength + x];
}


function createHeaderCellWithText(text){
    let headerCell = document.createElement('th');
    headerCell.innerText = text;

    return headerCell;
}

/**
 * @param {ChessBoard} board 
 */
function createTableFromMatrix(board){
    const table = document.createElement('table');
    /** @type {HTMLTableRowElement} */
    let row = null;
    /** @type {HTMLTableCellElement} */
    let cell = null;

    // const headerRow = document.createElement('tr');
    // headerRow.append(...["", "a","b","c","d","e","f","g","h"].map(createHeaderCellWithText));

    // table.appendChild(headerRow)

    for(let y = 0; y < board.yLength; y++){
        row = document.createElement('tr');
        row.append(createHeaderCellWithText(board.yLength-y));

        for(let x = 0; x < board.xLength; x++){
            cell = document.createElement('td');
            cell.textContent = board.get(x,y);

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    // table.appendChild(headerRow)

    return table;
}

/**
 * @param {ChessBoard} board 
 */
function createTableFromMatrixHtml(board){
    const tableHtml = `<tbody>` +
        `${[...range(1, board.yLength)].map(y => `<tr>${[...range(1, board.xLength)].map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}` +
        `</tbody>`;

    return tableHtml;
}

function createHeaderRowHtml(/*hasHeaderColOnLeft = false, hasHeaderColOnRight = false*/){
    const headerRow = ["a","b","c","d","e","f","g","h"];

    // if(hasHeaderColOnLeft){
    //     headerRow.unshift('+');
    // }

    // if(hasHeaderColOnRight){
    //     headerRow.push('+');
    // }

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

/** @param {Set<BoardViewHeader>} headers*/
function createBoardTable(headers){
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

    let mtrx = createMatrix(8,8);
    htmls.push(createTableFromMatrixHtml({xLength: 8, yLength: 8, map: mtrx, get: getBoardMapLocation.bind(null, mtrx, 8)}));

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
    /** @param {ChessBoard} board */
    constructor(board){
        this.board = board;
        this.boardHtml = null;
        this.html = null;

        /** @type {Set<BoardViewHeader>} */
        this.headersToShow = new Set();
    }

    /** @param {Set<BoardViewHeader> | null} headers*/
    init(headers = null) {
        if(headers){
            this.showHeaders(headers);
        }

        this.boardHtml = createTableFromMatrix(this.board);
    }

    addEventListener = this.boardHtml?.addEventListener;

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

    render(){
        throw "TODO..."
    }
}


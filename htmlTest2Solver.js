/** @private @typedef {import("./board").BoardPos} BoardPos*/

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
        .map(pos => ({x: x + pos.x, y: y + pos.y}))
        .filter(pos => 
            pos.x < matrixXLength 
            && pos.x >= 0
            && pos.y < matrixYLength
            && pos.y >= 0
        );
}

/**
 * 
 * @param {number} start 
 * @param {number} end 
 */
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

/** @private @typedef {import("./board").ChessBoard} ChessBoard*/
/** @private @typedef {import("./board").BoardPos} BoardPos*/

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
        `${[...range(1, board.yLength)].map(y => `<tr>${[...range(1, board.xLength)].map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}` +
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

        for(let pos of positions){
            this.tbody.rows[pos.y].cells[pos.x].textContent = this.board.get(pos.x,pos.y).nextFreePositions.length;
        }
    }
}

/** @private @typedef {import("./boardView.old").BoardView} BoardView */
/** @private @typedef {import("./board").ChessBoard} ChessBoard */

class BoardManager {
    /**
     *
     * @param {ChessBoard} board
     * @param {BoardView} boardView
     */
    constructor(board, boardView){
        /** @private */
        this.board = board;
        /** @private */
        this.boardView = boardView;
        this.xLength = this.board.xLength;
        this.yLength = this.board.yLength;
    }


    /**
     * @param {number} x
     * @param {number} y
     */
    occupy(x, y){
        let square = this.board.get(x, y);

        if(square.state === BOARD_SQUARE_STATE_OCCUPIED){
            throw "Square occupied.";
        }

        square.state === BOARD_SQUARE_STATE_OCCUPIED;

        for(let nextPos of square.nextFreePositions){
            let square =  this.board.get(nextPos.x, nextPos.y);

            square.nextFreePositions.splice(square.nextFreePositions.findIndex(pos => pos.x === nextPos.x && pos.y === nextPos.y), 1);
        }

        this.boardView.update([{x, y}, ...square.nextFreePositions]);
    }

    resetBoard() {
        this.board = new ChessBoard(8, 8);
    }
}

/** @typedef {import('./board').ChessBoard} ChessBoard*/
/** @typedef {import('./board').BoardPos} BoardPos*/
/** @typedef {import('./boardManager').BoardManager} BoardManager*/

class Game {
    /** @arg {BoardManager} boardManager */
    constructor(boardManager){
        /** @private */
        this.boardManager = boardManager;
        /** @public @type {BoardPos | null} */
        this.lastPlacedPos = null;
        this.movesHistory = [];

        this.nonOccupiedCount = boardManager.xLength * boardManager.yLength;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    place = (x, y) => {
        this.boardManager.occupy(x, y);
        this.movesHistory.push({x,y});
        this.lastPlacedPos = {x,y};
        this.nonOccupiedCount--;

        console.log(this.movesHistory);
    }

    resetBoard = () => {
        this.boardManager.resetBoard();
    }
}

/**
 * @typedef BoardPos
 * @prop {number} x
 * @prop {number} y
 */

/** 
 * @typedef BoardSquare
 * @prop {BoardPos} pos
 * @prop {boolean} isOccupied
 * @prop {BoardPos[]} nextFreePositions
 */

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
                pos: {x,y},
                isOccupied: false,
                nextFreePositions: getAvailableHorsePos(x, y, xLength, yLength),
            }
        }
    }

    return matrix;  
}

class ChessBoard {
    /**
     * @param {number} xLength 
     * @param {number} yLength 
     */
    constructor(xLength, yLength){
        /** @private */
        this._map = createMatrix(xLength, yLength);
        
        this.xLength = xLength;
        this.yLength = yLength;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    get(x, y) {
        return this._map[y*this.xLength + x];
    }
}

/** @private @typedef {import("./board").ChessBoard} ChessBoard*/
/** @private @typedef {import("./board").BoardPos} BoardPos*/
/** @private @typedef {import("./game").Game} Game*/

class AutoSolver {
    /**
     * @param {ChessBoard} board 
     * @param {Game} game 
     */
    setBoard = (board, game) => {
        if(!game.lastPlacedPos){
            for(let y = 0; y < board.yLength; y++){
                for(let x = 0; x < board.xLength; x++){
                    if(board.get(x, y).state === BOARD_SQUARE_STATE_OCCUPIED){
                        throw "Board found occupied square. LastMovePos not defined."
                    }
                }
            }
        }

        this.board = board;
        this.game = game;
    }

    solve = (delayMs = 0) => {
        if(this.game.nonOccupiedCount === 0){
            return true;
        }

        if(!this.game.lastPlacedPos){
            this.game.place(
                Math.round((Math.random()*this.board.xLength-1) % this.board.xLength)
                ,Math.round((Math.random()*this.board.yLength-1) % this.board.yLength)
            );
            return setTimeout(this.solve(delayMs), delayMs);
        }

        let boardSquare = this.board.get(this.game.lastPlacedPos.x, this.game.lastPlacedPos.y);
        let nextSquare = boardSquare.nextFreePositions.map(({x, y}) => this.board.get(x,y)).sort((a,b) => a.nextFreePositions.length - b.nextFreePositions.length).filter(x => x.nextFreePositions.length >= 2)[0]

        this.game.place(nextSquare.pos.x, nextSquare.pos.y);
        
        return setTimeout(this.solve(delayMs), delayMs);
    }
}
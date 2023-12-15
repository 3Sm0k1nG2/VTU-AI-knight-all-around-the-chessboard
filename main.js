import { matrixXLength, matrixYLength } from "./common.js";
import { Board } from "./board.js"
// import { BoardManager } from "./boardManager.js";
import { BoardView } from "./boardView.old.js";
import { Game } from "./game.js";
import { clickAction, mouseoverAction } from "./gameEvents.js";
import { StartMenu } from "./menus/startMenu.js";
import { GameMenu } from "./menus/gameMenu.js";
import { EndMenu } from "./menus/endMenu.js";
import { AppManager } from "./appManager.js";
// import { AutoSolver } from "./autosolver.js";
import { MenuManager } from "./menuManager.js";
import { createBoardView } from "./views/boardView.js"
import { createHistoryModule } from "./modules/historyModule.js"
import { isNullOrUndefined } from "./utils.js";
import { BOARD_SQUARE_STATE_NEXT, BOARD_SQUARE_STATE_OCCUPIED } from "./types.d.js";
import { createBoardModule } from "./modules/boardModule.js";
import { createMatrixModule } from "./modules/matrixModule.js";
import { BoardManager } from "./boardManager.js";
import { GameManager } from "./gameManager.js";
import { AutoSolver } from "./autosolver.js";



/**
 * @private
 * @template T
 * @typedef {import("./types.d.js").HistoryModule<T>} HistoryModuleType<T>
 */

// class GameManager {
//     /** 
//      * @param {BoardManager} boardManager
//      * @param {HistoryModuleType<HistoryMove>} historyModule
//      */
//     constructor(boardManager, historyModule) {
//         this.boardManager = boardManager;
//         this.historyModule = historyModule;

//         this.nonOccupiedCount = matrixXLength * matrixYLength;
//     }

//     /** @type {(gameSession: GameSession) => void} */
//     setGameSession = (gameSession) => {
//         this.gameSession = gameSession;
//     }

//     /** @type {(pos: BoardPosTypes) => boolean} */
//     place = (pos) => {
//         const square = this.boardManager.peek(pos);

//         /** @type {HistoryMove} */
//         const move = {
//             target: {
//                 pos: square.pos,
//                 state: square.state,
//                 nextFreeSquares: square.nextFreePositions.map(p => ({...this.boardManager.peek(p), nextFreePositions: [...this.boardManager.peek(p).nextFreePositions]}))
//             },
//             lastPlacedPos: this.historyModule.peek()
//         }

//         if(this.boardManager.peek(pos).state === BOARD_SQUARE_STATE_OCCUPIED){
//             return false;
//         }
//         if(this.boardManager.peek(pos).state !== BOARD_SQUARE_STATE_NEXT && !isNullOrUndefined(this.historyModule.peek())){
//             return false;
//         }

//         if(!isNullOrUndefined(this.historyModule.peek())){
//             const move = this.historyModule.peek();
//             for(let {pos, state} of move.target.nextFreeSquares){
//                 this.boardManager.peek(pos).state = state; 
//             }
//         }

//         this.boardManager.occupy(pos)

//         this.historyModule.push(move);

//         this.nonOccupiedCount--;

//         console.log(this.historyModule);
//     }

//     /** @type {() => void} */
//     reset = () => {
//         this.boardManager.reset();
//         this.boardManager.boardView.update();

//         this.historyModule.clear();
//         this.nonOccupiedCount = this.boardManager.board.xLength * this.boardManager.board.yLength;
//     }

//     back = () => {
//         const move = this.historyModule.pop();

//         const square = this.boardManager.peek(move.target.pos);

//         // square.pos = move.target.pos;
//         square.state = move.target.state;
//         square.nextFreePositions = move.target.nextFreeSquares.map(p => p.pos);

//         let actualSquare;
//         for(let square of move.target.nextFreeSquares){
//             actualSquare = this.boardManager.peek(square.pos);
//             actualSquare.nextFreePositions.push(move.target.pos);
//             actualSquare.state = square.state;
//         }

//         this.nonOccupiedCount++;

//         this.boardManager.boardView.update([{...move.target.pos}, ...square.nextFreePositions]);
        
//         let prevMove;
//         if(!isNullOrUndefined(prevMove = this.historyModule.peek())){
//             for(let square of prevMove.target.nextFreeSquares){
//                 this.boardManager.peek(square.pos).state = BOARD_SQUARE_STATE_NEXT;
//             }
//             this.boardManager.boardView.update([{...prevMove.target.pos}, ...prevMove.target.nextFreeSquares.map(x => x.pos)])
//         }
//     }
// }

// class BoardManager {
//     /** @param {RenderableView} boardView */
//     constructor(boardView){
//         this.boardView = boardView;
//     }

//     /** @param {Board} board */
//     setBoard = (board) => {
//         /** @type {Board} */
//         this.board = board;
//         this.boardView.update();
//     }
    
//     /** @param {RenderableView} boardView */
//     setBoardView = (boardView) => {
//         this.boardView = boardView;
//     }

//     /** @type {(pos: BoardPosTypes) => BoardSquare} */
//     peek = (pos) => {
//         return this.board.get(pos.x, pos.y);
//     }

//     /** @type {(pos: BoardPosTypes) => boolean} */
//     occupy = (pos) => {
//         let square = this.board.get(pos.x, pos.y);

//         if(square.state === BOARD_SQUARE_STATE_OCCUPIED){
//             throw "Square occupied.";
//         }

//         square.state = BOARD_SQUARE_STATE_OCCUPIED;

//         /** @type {BoardSquare} */
//         let nextSquare;
//         for(let nextPos of square.nextFreePositions){
//             nextSquare =  this.board.get(nextPos.x, nextPos.y);

//             nextSquare.state = BOARD_SQUARE_STATE_NEXT;
//             nextSquare.nextFreePositions.splice(nextSquare.nextFreePositions.findIndex(pos => pos.x === square.pos.x && pos.y === square.pos.y), 1);
//         }

//         let posToUpdate = [{x:pos.x, y:pos.y}, ...square.nextFreePositions];
//         // square.nextFreePositions = [];

//         this.boardView.update(posToUpdate);

//         return true;
//     }

//     /** @type {() => void} */
//     reset = () => {
//         this.board = new Board(this.board.xLength, this.board.yLength);
//         this.boardView.setBoard(this.board);
//         this.boardView.update();
//     }

// }

// class AutoSolver {
//     /**
//      * @param {GameManager} gameManager
//      */
//     setGameManager = (gameManager) => {
        
//         if(!gameManager.lastPlacedPos){
//             for(let y = 0; y < gameManager.boardManager.board.yLength; y++){
//                 for(let x = 0; x < gameManager.boardManager.board.xLength; x++){
//                     if(gameManager.boardManager.peek({x, y}).state === BOARD_SQUARE_STATE_OCCUPIED){
//                         throw "Board found occupied square. LastMovePos not defined."
//                     }
//                 }
//             }
//         }

//         this.gameManager = gameManager;
//     }

//     solveNext = () => {
//         if(this.gameManager.nonOccupiedCount === 0){
//             return true;
//         }

//         const lastMove = this.gameManager.historyModule.peek();

//         if(!lastMove){
//             this.gameManager.place({
//                 x: Math.floor((Math.random()*gameManager.boardManager.board.xLength) % gameManager.boardManager.board.xLength)
//                 ,y: Math.floor((Math.random()*gameManager.boardManager.board.yLength) % gameManager.boardManager.board.yLength)
//             });
//             return;
//         }

//         let boardSquare = gameManager.boardManager.peek({x:lastMove.target.pos.x, y:lastMove.target.pos.y});
//         let nextSquare = boardSquare.nextFreePositions
//             .map(pos => gameManager.boardManager.peek(pos))
//             .filter(x => !(x.state === BOARD_SQUARE_STATE_OCCUPIED))
//             .sort((a,b) => a.nextFreePositions.length - b.nextFreePositions.length)[0]

//         this.gameManager.place({x: nextSquare.pos.x, y: nextSquare.pos.y});
        
//         return;
//     }
// }

const root = document.getElementById('root');
const actions = document.createElement('div');
root.append(actions);

let historyModule = createHistoryModule();

const boardManager = new BoardManager();
const gameManager = new GameManager(boardManager, historyModule);

historyModule = createHistoryModule();

let board = createBoardModule(createMatrixModule({x: 8, y: 8}));
const boardView = createBoardView(createHistoryModule(), createHistoryModule(), board, clickAction.bind(null, gameManager, historyModule), mouseoverAction.bind(null, boardManager, historyModule), new Set(['bottom','left']));
boardManager.setBoardView(boardView);
boardManager.setBoard(board);

const autoSolver = new AutoSolver();
autoSolver.setGameManager(gameManager);

const menuManager = new MenuManager(actions);
const menus = {
    start: new StartMenu(menuManager),
    game: new GameMenu(gameManager, autoSolver),
    end: new EndMenu(menuManager),
}
menuManager.setMenus(menus);

menuManager.changeMenu('start');

const appManager = new AppManager(root, menuManager);
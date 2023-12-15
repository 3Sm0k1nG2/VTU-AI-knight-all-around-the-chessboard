import { matrixXLength, matrixYLength } from "./common.js";
import { ChessBoard } from "./board.js"
import { BoardManager } from "./boardManager.js";
import { BoardView } from "./boardView.old.js";
import { Game } from "./game.js";
import { decreaseHorsePos, showHorsePos } from "./gameEvents.js";
import { StartMenu } from "./menus/startMenu.js";
import { GameMenu } from "./menus/gameMenu.js";
import { AppManager } from "./appManager.js";
import { AutoSolver } from "./autosolver.js";

// let startMenu = new StartMenu();
// let gameMenu = new GameMenu();
// const appManager = new AppManager(document.getElementById('root'), {start: startMenu, game: gameMenu});
// startMenu.appManager = appManager;

let board = new ChessBoard(8,8);
let boardView = new BoardView(document.getElementById('root'), board, ['left','bottom']);
let boardManager = new BoardManager(board, boardView);
let game = new Game(boardManager);
// gameMenu.game = new Game(new BoardManager(board, boardView));
// gameMenu.boardView = boardView;

let autosolver = new AutoSolver();
autosolver.board = board;
autosolver.game = game;

const actionsElement = document.getElementById('actions');

let button = document.createElement('button');
button.addEventListener('click', game.back);
button.textContent = 'Back';


actionsElement.appendChild(button);

button = document.createElement('button');
button.addEventListener('click', autosolver.solveNext);
button.textContent = 'Autosolve';

actionsElement.appendChild(button);

button = document.createElement('button');
button.addEventListener('click', game.resetBoard);
button.textContent = 'Reset Board';

actionsElement.appendChild(button);

delay(autosolver.solveNext, 1000)

function delay(func, delayMs = 0){
    setTimeout(() => {func(); delay(func, delayMs)}, delayMs)

}
// }

// setTimeout(() => {autosolver.solve(1)}, 5000)

// appManager.changeMenu('start');

// const game = createGame();

// function createGame(){
//     const board = new ChessBoard(matrixXLength, matrixYLength);
        
//     const boardView = new BoardView(document.createElement('div'), board);
//     document.getElementById('root').appendChild(boardView.htmlRef);

//     const boardManager = new BoardManager(board, boardView);

//     const game = new Game(boardManager);
    
//     boardView.htmlRef.addEventListener('click', (e) => decreaseHorsePos(e, board));
//     boardView.htmlRef.addEventListener("mouseover", (e) => showHorsePos(e, board));

//     return game;
// }
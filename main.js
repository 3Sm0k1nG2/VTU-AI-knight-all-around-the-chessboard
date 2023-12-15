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
import { MenuManager } from "./menuManager.js";
import { createBoardView } from "./views/boardView.js"
import { createHistoryModule } from "./modules/historyModule.js"
import { createBoardModule } from "./modules/boardModule.js";
import { createMatrixModule } from "./modules/matrixModule.js";
import { BoardManager } from "./boardManager.js";
import { GameManager } from "./gameManager.js";
import { AutoSolver } from "./autosolver.js";

const root = document.getElementById('root');
for(let child of root.children){
    root.removeChild(child);
}
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

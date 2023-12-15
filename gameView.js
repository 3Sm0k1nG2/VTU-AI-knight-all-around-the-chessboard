import { getAvailableHorsePos } from "./common";

/** @private @typedef {import("./board").ChessBoard} ChessBoard */
/** @private @typedef {import("./game").Game} Game*/
/** @private @typedef {import("./boardView.old").BoardView} BoardView*/
/** @private @typedef {import("./board").BoardPos} BoardPos*/


/** @param {BoardPos[]} nextCells */
function clearNextCells(nextCells){
    while(nextCells.length > 0){
        let pos = nextCells.pop()
        if(tableElement.rows[pos.y].cells[pos.x+1].tagName.toLowerCase() !== "td"){
            continue;
        }

        if(tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor !== "cyan"){
            continue;
        }

        tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "";
    }
}

/** @param {BoardPos[]} nextCells */
function showNextCells(nextCells){
    for(let pos of nextCells){
        if(tableElement.rows[pos.y].cells[pos.x+1].tagName.toLowerCase() !== "td"){
            continue;
        }

        tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "cyan";
    }
}

/** @param {BoardPos[]} markedCells */
function clearMarkedCells(markedCells){
    while(markedCells.length > 0){
        let pos = markedCells.pop()
        if(tableElement.rows[pos.y].cells[pos.x+1].tagName.toLowerCase() !== "td"){
            continue;
        }

        if(tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor !== "yellow"){
            continue;
        }

        tableElement.rows[pos.y].cells[pos.x+1].style.backgroundColor = "";
    }
}


class GameView {
    /** @param {BoardView} boardView */
    constructor(boardView){
        this.boardV
    }

    render(){
        this.board.render();
    }
}

export {
    GameView
}
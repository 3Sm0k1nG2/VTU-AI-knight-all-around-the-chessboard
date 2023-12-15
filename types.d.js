// #region Common

/** @typedef {number} Int Integer */
/** @typedef {number} UInt Unsigned Integer (>= 0) */

/** @typedef {Matrix1D<T> | Matrix2D<T>} MatrixTypes<T> */

/** 
 * @template T
 * @typedef {Array<T>} Matrix1D
 */

/**
 * Slow
 * @deprecated 
 * 
 * @template T
 * @typedef {Array<Array<T>>} Matrix2D
 */

/**
 * @typedef View
 * 
 * @prop {() => void} render - Returns the view's root element
 * @prop {() => void} update - Updates the views
 */

/**
 * @template T
 * @typedef {Object} HistoryModule
 * 
 * @prop {(...items: T[]) => void} push
 * @prop {() => T} peek
 * @prop {() => T} pop
 * @prop {() => void} clear
 */

// #endregion


// #region Board Interfaces

/** @typedef {Vector2D | Vector3D} VectorTypes */

/**
 * @typedef {Object} Vector2D
 * 
 * @prop {UInt} x
 * @prop {UInt} y
 */

/**
 * @typedef {Object} Vector3D
 * 
 * @prop {UInt} x
 * @prop {UInt} y
 * @prop {UInt} z
*/

/** 
 * @typedef {( 
*      BOARD_SQUARE_STATE_OCCUPIED 
*  |   BOARD_SQUARE_STATE_NEXT 
*  |   BOARD_SQUARE_STATE_FREE 
* )} BoardSquareStates
*/ 

export const BOARD_SQUARE_STATE_OCCUPIED = `occupied`;
export const BOARD_SQUARE_STATE_NEXT = `next`;
export const BOARD_SQUARE_STATE_FREE = `free`;

/**
 * @typedef {Object} BoardSquare
 * 
 * @prop {VectorTypes} pos
 * @prop {BoardSquareStates} state
 * @prop {VectorTypes[]} nextFreePositions
 */

/**
 * @typedef {Object} Board
 * 
 * @prop {(pos: VectorTypes) => BoardSquareTypes} get
 */

/**
 * @typedef BoardManager
 * 
 * @prop {Board} board
 * @prop {View} boardView
 * @prop {(pos: VectorTypes) => boolean} occupy
 */

// #endregion


// #region Game Interfaces

/**
 * @typedef {Object} GameSession
 * 
 * @prop {Board} board
 */

/**
 * @typedef {View} GameView
 */

/**
 * @typedef {Object} GameManager
 * 
 * @prop {GameSession} gameSession
 * @prop {(pos: VectorTypes) => boolean} place
 * @prop {() => any} reset
 * @prop {() => boolean} back
 */

// #endregion


// #region Web

/**
 * @typedef WebToGameTranslator
 * 
 * 
 */

//


// #region Menus

/**
 * @typedef Menu
 */

/**
 * @typedef MenuManager
 * 
 * @prop {(menu: Menu) => any} changeMenu
 */

// #endregion


// #region External

/**
 * @typedef AutoSolver
 * 
 * @prop {() => any} solve
 */

/**
 * @typedef Player
 * 
 * @prop {() => any} click
 * @prop {() => any} hover
 */

// #endregion
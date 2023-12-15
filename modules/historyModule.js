import { isNullOrUndefined } from "../utils.js";

/** 
 * @private 
 * @template T
 * @typedef {import("../types.d.js").HistoryModule<T>} HistoryModule<T>
 */

/**
 * @template T
 * @returns {HistoryModule<T>} A module to store history actions
 */
function createHistoryModule(){
    const history = [];

    return {
        push: (...data) => {
            history.push(...data);
        },
    
        pop: () => {
            return history.pop();
        },
    
        peek: () => {
            return history[history.length-1];
        },
    
        clear: () => {
            while(!isNullOrUndefined(history.pop())){
            }
        },
    }
}

export {
    createHistoryModule
}
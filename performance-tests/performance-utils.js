/** @typedef {number} Microsecond - Microseconds as integer */

/**
 * Measure the performance time in microseconds.
 * 
 * @arg {() => void} measureMe - The feature to be measured.
 * 
 * @returns {Microsecond} - The elapsed time in microseconds.
 */
function measurePerformanceTime(measureMe){
    const start = performance.now();

    measureMe();

    const end = performance.now();
    
    return end - start;
}

module.exports = {
    measurePerformanceTime
}
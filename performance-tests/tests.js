const {measurePerformanceTime} = require("./performance-utils");
const {one2DMatrix} = require('./unit.one-2dmatrix');
const {two2DMatrices} = require('./unit.two-2dmatrices');
const {one1DMatrix} = require('./unit.one-1dmatrix');
const {two1DMatrices} = require('./unit.two-1dmatrices');

// const queue = [two2DMatrices,one2DMatrix];
// const queue = [one2DMatrix];

// const queue = [one1DMatrix];

// console.log("one1DMatrix: " + measurePerformanceTime(one1DMatrix) + " ms");
console.log("two1DMatrices: " + measurePerformanceTime(two1DMatrices) + " ms");
// console.log("one2DMatrix: " + measurePerformanceTime(one2DMatrix) + " ms");
// console.log("two2DMatrices: " + measurePerformanceTime(two2DMatrices) + " ms");

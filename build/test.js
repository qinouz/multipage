const utils = require('./tu');
var pages = utils.getEntry(['./src/module/*.html', './src/module/*/*.html', './src/module/*/*/*.html']);
var mpages = utils.getEntryPages(pages);

console.log("多页面路径-------------utils.getEntry")
console.log(pages)
console.log("多页面路径-------------utils.getEntryPages")
console.log(mpages);

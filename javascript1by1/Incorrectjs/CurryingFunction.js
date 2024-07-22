function curry(fn) { 
 // Implement the function 
} 
function add(a, b, c) { 
 return a + b + c; 
} 
const curriedAdd = curry(add); 
console.log(curriedAdd(1)(2)(3)); // 6 
console.log(curriedAdd(1, 2)(3)); // 6 
console.log(curriedAdd(1)(2, 3)); // 6 

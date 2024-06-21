### 6. Currying Function 
**Question:** 
Write a function `curry` that takes a function `fn` and returns a curried version of `fn`. 
**Example:** 
```javascript 
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
``` 
**Expected Output:** 
- The function should allow partial application of the arguments. 

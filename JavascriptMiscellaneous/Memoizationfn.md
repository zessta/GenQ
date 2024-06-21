### 1. Memoization Function 
**Question:** 
Write a function `memoize` that takes a function `fn` as an argument and returns a memoized version of `fn`. The memoized function should cache the results based on the arguments passed. 
**Example:** 
```javascript 
function add(a, b) { 
 return a + b; 
} 
const memoizedAdd = memoize(add); 
console.log(memoizedAdd(1, 2)); // 3 (calculated) 
console.log(memoizedAdd(1, 2)); // 3 (cached) 
console.log(memoizedAdd(2, 3)); // 5 (calculated) 
console.log(memoizedAdd(2, 3)); // 5 (cached) 
``` 
**Expected Output:** 
- The function should calculate and cache results based on the inputs. 

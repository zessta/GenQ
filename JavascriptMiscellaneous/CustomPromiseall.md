### 4. Custom Promise.all 
**Question:** 
Write a function `promiseAll` that mimics the behavior of `Promise.all`. It should take an array of promises and return a single promise that resolves with an array of results once all input promises have resolved, or rejects if any promise rejects. 
**Example:** 
```javascript 
function promiseAll(promises) { 
 // Implement the function 
} 
const promise1 = Promise.resolve(3); 
const promise2 = 42; 
const promise3 = new Promise((resolve, reject) => { 
 setTimeout(resolve, 100, 'foo'); 
}); 
promiseAll([promise1, promise2, promise3]).then((results) => { 
 console.log(results); // [3, 42, "foo"] 
}); 
``` 
**Expected Output:** 
- The function should handle an array of promises and return a promise that resolves with an array of results. 

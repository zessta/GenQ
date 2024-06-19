### 5. Function Debounce 
**Question:** 
Implement a function `debounce` that returns a debounced version of the given function. The debounced function delays the execution until after `wait` milliseconds have elapsed since the last time it was invoked. 
**Example:** 
```javascript 
function debounce(fn, wait) { 
 // Implement the function 
} 
const log = debounce((message) => console.log(message), 2000); 
log('Hello'); // Will only log "Hello" if no other calls are made within 2000ms 
``` 
**Expected Output:** 
- The function should prevent the `fn` from being called until after the specified wait time has passed without another call. 

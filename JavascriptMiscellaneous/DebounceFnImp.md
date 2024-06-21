### 15. Debounce Function Implementation 
**Question:** 
Implement a debounce function that delays the execution of the input function until after a specified delay has passed since the last time the debounced function was invoked. 
**Example:** 
```javascript 

function debounce(fn, delay) { 
 let timeoutID; 
 return function(...args) { 
 if (timeoutID) { 
 clearTimeout(timeoutID); 
 } 
 timeoutID = setTimeout(() => { 
 fn.apply(this, args); 
 }, delay); 
 }; 
} 
const log = debounce((message) => console.log(message), 1000); 
document.getElementById('debounce-button').onclick = () => log('Button clicked!'); 
// HTML 
// <button id="debounce-button">Click me</button> 

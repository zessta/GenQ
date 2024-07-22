function throttle(fn, wait) { 
 let isThrottled = false, lastArgs, lastThis; 
 function wrapper() { 
 if (isThrottled) { 
 lastArgs = arguments; 
 lastThis = this; 
 return; 
 } 
 fn.apply(this, arguments); 
 isThrottled = true; 
 setTimeout(() => { 
 isThrottled = false; 
 if (lastArgs) { 
 wrapper.apply(lastThis, lastArgs); 
 lastArgs = lastThis = null; 
 } 
 }, wait); 
 } 
 return wrapper; 
} 
const log = throttle((message) => console.log(message), 1000); 

document.getElementById('throttle-button').onclick = () => log('Button clicked!'); 
// HTML 
// <button id="throttle-button">Click me</button> 

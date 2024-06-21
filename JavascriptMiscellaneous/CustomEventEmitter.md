### 21. Custom Event Emitter 
**Question:** 
Implement a custom event emitter class in JavaScript that allows subscribing to events, emitting events, and removing event listeners. 
**Example:** 
```javascript 
class EventEmitter { 
 constructor() { 
 this.events = {}; 
 } 
 on(event, listener) { 
 if (!this.events[event]) { 
 this.events[event] = []; 
 } 
 this.events[event].push(listener); 
 } 
 off(event, listener) { 
 if (!this.events[event]) return; 
 this.events[event] = this.events[event].filter(l => l !== listener); 
 } 
 emit(event, ...args) { 
 if (!this.events[event]) return; 
 this.events[event].forEach(listener => listener(...args)); 
 } 
} 
// Usage example 
const emitter = new EventEmitter(); 
function onFoo(data) { 
 console.log('foo event:', data); 
file:///C:/Users/prave/AppData/Local/Temp/ccdf6992-b7b4-442c-b80e-82beab0eacb5_b493b1375914d0c0477d5f3d7512d7b3b8d12087190ab… 21/34
29/05/2024, 13:37 ChatGPT Data Export 
} 
emitter.on('foo', onFoo); 
emitter.emit('foo', { some: 'data' }); // Output: foo event: { some: 'data' } 
emitter.off('foo', onFoo); 
emitter.emit('foo', { some: 'data' }); // No output 
``` 

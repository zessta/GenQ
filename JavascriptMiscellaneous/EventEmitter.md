### 3. Event Emitter 
**Question:** 
Implement a simple `EventEmitter` class that allows for event registration, 
deregistration, and emitting events. 

**Example:** 
```javascript 
class EventEmitter { 
 // Implement methods on, off, and emit 
} 
const emitter = new EventEmitter(); 
function callback(data) { 
 console.log('Event received with data:', data); 
} 
emitter.on('event1', callback); 
emitter.emit('event1', { some: 'data' }); // Event received with data: { some: 'data' } 
emitter.off('event1', callback); 
emitter.emit('event1', { some: 'data' }); // No output 
``` 
**Expected Output:** 
- The `on` method registers an event listener. 
- The `off` method deregisters an event listener. 
- The `emit` method triggers all listeners for a given event. 

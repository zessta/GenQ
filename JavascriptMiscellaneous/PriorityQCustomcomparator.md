### 9. Priority Queue with Custom Comparator 
**Question:** 
Implement a Priority Queue class in JavaScript that accepts a custom comparator function to determine the priority of elements. 
**Requirements:** 
- Enqueue elements with a priority 
- Dequeue elements in order of priority 
- Use a custom comparator for priority 
**Example:** 
```javascript 
class PriorityQueue { 
 constructor(comparator = (a, b) => a - b) { 
 this.comparator = comparator; 
 this.items = []; 
 } 
 enqueue(item) { 
 this.items.push(item); 
 this.items.sort(this.comparator); 
 } 
 dequeue() { 
 return this.items.shift(); 
 } 
 peek() { 
 return this.items[0]; 
 } 
 isEmpty() { 
 return this.items.length === 0; 
 } 
 size() { 
 return this.items.length; 
 } 
} 

const pq = new PriorityQueue((a, b) => b.priority - a.priority); 
pq.enqueue({ task: 'task1', priority: 2 }); 
pq.enqueue({ task: 'task2', priority: 1 }); 
pq.enqueue({ task: 'task3', priority: 3 }); 
console.log(pq.dequeue()); // { task: 'task3', priority: 3 } 
console.log(pq.dequeue()); // { task: 'task1', priority: 2 } 
console.log(pq.dequeue()); // { task: 'task2', priority: 1 } 
``` 


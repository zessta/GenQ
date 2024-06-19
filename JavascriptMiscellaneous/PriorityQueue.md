### 30. Priority Queue 
**Question:** 
Implement a priority queue in JavaScript. The priority queue should allow enqueueing items with a priority and dequeuing items in order of their priority (higher priority items are dequeued first). 
**Example:** 
```javascript 
class PriorityQueue { 
 constructor() { 
 this.queue = []; 
 } 
 enqueue(item, priority) { 
 this.queue.push({ item, priority }); 
 this.queue.sort((a, b) => b.priority - a.priority); 
 } 
 dequeue() { 
 return this.queue.shift().item; 
 } 
 peek() { 
 return this.queue[0]?.item; 
 } 
 isEmpty() { 
 return this.queue.length === 0; 
 } 
} 
// Usage example 
const pq = new PriorityQueue(); 
pq.enqueue('low priority task', 1); 
pq.enqueue('high priority task', 10); 
pq.enqueue('medium priority task', 5); 
console.log(pq.dequeue()); // high priority task 
console.log(pq.dequeue()); // medium priority task 
console.log(pq.dequeue()); // low priority task 
``` 

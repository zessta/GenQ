class TransactionalState { 
 constructor(initialState = {}) { 
 this.state = { ...initialState }; 
 this.transactions = []; 
 } 
 begin() { 
 this.transactions.push({ ...this.state }); 
 } 
 commit() { 

 if (this.transactions.length === 0) { 
 throw new Error('No transaction to commit'); 
 } 
 this.transactions.pop(); 
 } 
 rollback() { 
 if (this.transactions.length === 0) { 
 throw new Error('No transaction to rollback'); 
 } 
 this.state = this.transactions.pop(); 
 } 
 set(key, value) { 
 if (this.transactions.length > 0) { 
 this.state[key] = value; 
 } else { 
 throw new Error('No active transaction'); 
 } 
 } 
 get(key) { 
 return this.state[key]; 
 } 
} 
// Usage example 
const state = new TransactionalState({ a: 1, b: 2 }); 
state.begin(); 
state.set('a', 10); 
console.log(state.get('a')); // 10 
state.rollback(); 
console.log(state.get('a')); // 1 
state.begin(); 
state.set('a', 20); 
state.commit(); 
console.log(state.get('a')); // 20 

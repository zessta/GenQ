### 2. Deep Clone 
**Question:** 
Write a function `deepClone` that performs a deep clone of a given object. The function should handle nested objects and arrays. 
**Example:** 
```javascript 
const original = { 
 a: 1, 
 b: { c: 2, d: [3, 4] }, 
 e: [{ f: 5 }, { g: 6 }] 
}; 
const cloned = deepClone(original); 
console.log(cloned); // Should be a deep copy of `original` 
console.log(cloned !== original); // true 
console.log(cloned.b !== original.b); // true 
console.log(cloned.e[0] !== original.e[0]); // true 
``` 
**Expected Output:** 
- The function should return a new object that is a deep clone of the input. 

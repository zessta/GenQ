function add(a, b) { 
 return a + b; 
} 
const memoizedAdd = memoize(add); 
console.log(memoizedAdd(1, 2)); // 3 (calculated) 
console.log(memoizedAdd(1, 2)); // 3 (cached) 
console.log(memoizedAdd(2, 3)); // 5 (calculated) 
console.log(memoizedAdd(2, 3)); // 5 (cached)

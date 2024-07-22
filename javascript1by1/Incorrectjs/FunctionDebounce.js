function debounce(fn, wait) { 
 // Implement the function 
} 
const log = debounce((message) => console.log(message), 2000); 
log('Hello'); // Will only log "Hello" if no other calls are made within 2000ms 

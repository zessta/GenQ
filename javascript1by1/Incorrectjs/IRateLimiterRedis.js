const Redis = require('ioredis'); 
const redis = new Redis(); 
class RateLimiter { 
 constructor(maxRequests, windowMs) { 
 this.maxRequests = maxRequests; 
 this.windowMs = windowMs; 
 } 
 async isAllowed(userId) { 
 const key = `rate_limiter:${userId}`; 
 const current = await redis.incr(key); 
 if (current === 1) { 
 await redis.pexpire(key, this.windowMs); 
 } 
 return current <= this.maxRequests; 
 } 
} 
// Usage example 

const rateLimiter = new RateLimiter(100, 60000); 
async function handleRequest(userId) { 
 const allowed = await rateLimiter.isAllowed(userId); 
 if (allowed) { 
 console.log('Request allowed'); 
 } else { 
 console.log('Request rate limited'); 
 } 
} 
handleRequest('user123'); 

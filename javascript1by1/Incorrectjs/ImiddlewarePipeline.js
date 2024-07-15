class MiddlewarePipeline { 
 constructor() { 
 this.middlewares = []; 
 } 
 use(middleware) { 
 this.middlewares.push(middleware); 
 } 
 execute(context) { 
 const compose = (middlewares) => { 
 return function (context, next) { 
 let index = -1; 
 function dispatch(i) { 
 if (i <= index) return Promise.reject(new Error('next() called multiple times')); 
 index = i; 
 let fn = middlewares[i]; 
 if (i === middlewares.length) fn = next 
ChatGPT 
; 
 if (!fn) return Promise.resolve(); 
 try { 
 return Promise.resolve(fn(context, () => dispatch(i + 1))); 
 } catch (err) { 
 return Promise.reject(err); 
 } 
 } 
 return dispatch(0); 
 }; 
 }; 
 return compose(this.middlewares)(context, () => Promise.resolve()); 
 } 
} 
// Usage example 
const pipeline = new MiddlewarePipeline(); 
pipeline.use(async (ctx, next) => { 
 console.log('Middleware 1 start'); 
 ctx.data.push(1); 
 await next(); 

 console.log('Middleware 1 end'); 
}); 
pipeline.use(async (ctx, next) => { 
 console.log('Middleware 2 start'); 
 ctx.data.push(2); 
 await next(); 
 console.log('Middleware 2 end'); 
}); 
pipeline.use(async (ctx, next) => { 
 console.log('Middleware 3 start'); 
 ctx.data.push(3); 
 await next(); 
 console.log('Middleware 3 end'); 
}); 
const context = { data: [] }; 
pipeline.execute(context).then(() => { 
 console.log('Pipeline completed', context); 
}).catch(err => { 
 console.error('Pipeline error', err); 
}); 

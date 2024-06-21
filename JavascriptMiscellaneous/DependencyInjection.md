### 22. Dependency Injection 
**Question:** 
Create a simple dependency injection system in JavaScript. It should allow defining dependencies and resolving them at runtime. 
**Example:** 
```javascript 
class Container { 
 constructor() { 
 this.services = new Map(); 
 } 
 register(name, definition, dependencies) { 
 this.services.set(name, { definition, dependencies }); 
 } 
 resolve(name) { 
 const target = this.services.get(name); 
 if (!target) { 
 throw new Error(`Service not found: ${name}`); 
 } 
 if (!target.instance) { 
 const { definition, dependencies } = target; 
 const resolvedDependencies = dependencies.map(dep => this.resolve(dep));  target.instance = new definition(...resolvedDependencies); 
 } 
 return target.instance; 
 } 
} 
class Logger { 
 log(message) { 
 console.log(message); 
 } 
} 
class UserService { 
 constructor(logger) { 
 this.logger = logger; 
 } 
 getUser() { 
 this.logger.log('User fetched'); 
 return { name: 'John Doe' }; 
 } 
} 
const container = new Container(); 
container.register('logger', Logger, []); 
container.register('userService', UserService, ['logger']); 
const userService = container.resolve('userService'); 
console.log(userService.getUser()); // Output: User fetched { name: 'John Doe' } ``` 

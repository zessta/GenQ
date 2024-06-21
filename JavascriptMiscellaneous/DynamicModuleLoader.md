### 27. Dynamic Module Loader 
**Question:** 
Implement a dynamic module loader in JavaScript that can load JavaScript modules dynamically based on user input. Use the `import` function to achieve this. 
**Example:** 
```javascript 
class ModuleLoader { 
 constructor(basePath) { 
 this.basePath = basePath; 
 } 
 async loadModule(moduleName) { 
 try { 
 const module = await import(`${this.basePath}/${moduleName}.js`); 
 return module; 
 } catch (error) { 
 console.error(`Failed to load module: ${moduleName}`, error); 
 throw error; 
 } 
 } 
} 
// Usage example 
const loader = new ModuleLoader('/modules'); 
loader.loadModule('exampleModule') 
 .then(module => { 
 module.default(); 
 }) 
 .catch(error => { 
 console.error('Error loading module:', error); 
 }); 
``` 

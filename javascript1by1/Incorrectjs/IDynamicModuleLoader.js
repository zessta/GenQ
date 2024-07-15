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

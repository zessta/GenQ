### 20. Virtualized List Rendering 
**Question:** 
Implement a virtualized list component that only renders visible items in a list to optimize performance for large datasets. Use vanilla JavaScript and implement scroll handling. 
**Example:** 
```javascript 
class VirtualizedList { 
 constructor(containerId, items, itemHeight, visibleCount) { 
 this.container = document.getElementById(containerId); 
 this.items = items; 
 this.itemHeight = itemHeight; 
 this.visibleCount = visibleCount; 
 this.startIndex = 0; 
 this.endIndex = visibleCount; 
 this.render(); 
 this.container.addEventListener('scroll', this.handleScroll.bind(this));  } 
 handleScroll() { 
 const scrollTop = this.container.scrollTop; 

 this.startIndex = Math.floor(scrollTop / this.itemHeight); 
 this.endIndex = this.startIndex + this.visibleCount; 
 this.render(); 
 } 
 render() { 
 this.container.innerHTML = ''; 
 const fragment = document.createDocumentFragment(); 
 for (let i = this.startIndex; i < this.endIndex && i < this.items.length; i++) {  const item = document.createElement('div'); 
 item.className = 'item'; 
 item.style.height = `${this.itemHeight}px`; 
 item.textContent = this.items[i]; 
 fragment.appendChild(item); 
 } 
 this.container.appendChild(fragment); 
 } 
} 
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`); 
new VirtualizedList('virtual-list-container', items, 30, 20); 
// HTML 
// <div id="virtual-list-container" style="height: 600px; overflow-y: auto;"></div> 
// CSS 
// .item { 
// box-sizing: border-box; 
// padding: 8px; 
// border-bottom: 1px solid #ccc; 
// } 

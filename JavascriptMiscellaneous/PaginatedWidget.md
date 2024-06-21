### 11. Paginated Widget 
**Question:** 
Implement a paginated widget that displays a list of addresses. The widget should show 5 addresses per page with the ability to navigate to the previous and next pages. 

**Example:** 
```javascript 
class PaginatedWidget { 
 constructor(addresses) { 
 this.addresses = addresses; 
 this.currentPage = 1; 
 this.addressesPerPage = 5; 
 this.render(); 
 } 
 changePage(page) { 
 if (page < 1 || page > this.totalPages()) return; 
 this.currentPage = page; 
 this.render(); 
 } 
 totalPages() { 
 return Math.ceil(this.addresses.length / this.addressesPerPage); 
 } 
 render() { 
 const container = document.getElementById('address-container'); 
 container.innerHTML = ''; 
 const start = (this.currentPage - 1) * this.addressesPerPage; 
 const end = start + this.addressesPerPage; 
 const addressesToShow = this.addresses.slice(start, end); 
 addressesToShow.forEach(address => { 
 const div = document.createElement('div'); 
 div.textContent = address; 
 container.appendChild(div); 
 }); 
 const pagination = document.createElement('div'); 
 pagination.className = 'pagination'; 
 const prevButton = document.createElement('button'); 
 prevButton.textContent = 'Previous'; 
 prevButton.onclick = () => this.changePage(this.currentPage - 1); 
 pagination.appendChild(prevButton); 
 const nextButton = document.createElement('button'); 
 nextButton.textContent = 'Next'; 
 nextButton.onclick = () => this.changePage(this.currentPage + 1); 
 pagination.appendChild(nextButton); 
 container.appendChild(pagination); 
 } 
} 
const addresses = [ 
 'Address 1', 'Address 2', 'Address 3', 'Address 4', 'Address 5', 
 'Address 6', 'Address 7', 'Address 8', 'Address 9', 'Address 10', 
 'Address 11', 'Address 12', 'Address 13', 'Address 14', 'Address 15' 
]; 
const widget = new PaginatedWidget(addresses); 

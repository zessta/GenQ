class DynamicTable { 
 constructor(data) { 
 this.data = data; 
 this.filteredData = [...data]; 
 this.sortOrder = 1; // 1 for ascending, -1 for descending 
 this.render(); 
 } 
 sortTable(column) { 
 this.filteredData.sort((a, b) => { 
 if (a[column] < b[column]) return -1 * this.sortOrder; 
 if (a[column] > b[column]) return 1 * this.sortOrder; 
 return 0; 
 }); 
 this.sortOrder *= -1; 
 this.render(); 
 } 
 searchTable(query) { 
 this.filteredData = this.data.filter(row =>  
 Object.values(row).some(val =>  
 val.toString().toLowerCase().includes(query.toLowerCase()) 
 ) 
 ); 
 this.render(); 
 } 
 render() { 
 const container = document.getElementById('table-container'); 
 container.innerHTML = ''; 
 const table = document.createElement('table'); 
 const thead = document.createElement('thead'); 
 const tr = document.createElement('tr'); 
 Object.keys(this.data[0]).forEach(column => { 
 const th = document.createElement('th'); 
 th.textContent = column; 
 th.onclick = () => this.sortTable(column); 
 tr.appendChild(th); 

 }); 
 thead.appendChild(tr); 
 table.appendChild(thead); 
 const tbody = document.createElement('tbody'); 
 this.filteredData.forEach(row => { 
 const tr = document.createElement('tr'); 
 Object.values(row).forEach(value => { 
 const td = document.createElement('td'); 
 td.textContent = value; 
 tr.appendChild(td); 
 }); 
 tbody.appendChild(tr); 
 }); 
 table.appendChild(tbody); 
 container.appendChild(table); 
 } 
} 
const data = [ 
 { Name: 'John', Age: 28, Country: 'USA' }, 
 { Name: 'Anna', Age: 22, Country: 'Sweden' }, 
 { Name: 'Mike', Age: 32, Country: 'Canada' }, 
]; 
const table = new DynamicTable(data); 
document.getElementById('search-input').oninput = (e) => 
table.searchTable(e.target.value); 
// HTML 
// <input type="text" id="search-input" placeholder="Search"> 
// <div id="table-container"></div> 

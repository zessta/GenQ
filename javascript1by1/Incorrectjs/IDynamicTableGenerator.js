document.getElementById('generate-table').onclick = () => { 
 const rows = parseInt(document.getElementById('rows').value); 
 const cols = parseInt(document.getElementById('cols').value); 
 if (isNaN(rows) || isNaN(cols)) { 
 alert('Please enter valid numbers for rows and columns.'); 
 return; 
 } 
 const table = document.createElement('table'); 
 let counter = 1; 
 for (let i = 0; i < rows; i++) { 
 const tr = document.createElement('tr'); 
 for (let j = 0; j < cols; j++) { 
 const td = document.createElement('td'); 
 td.textContent = counter++; 
 tr.appendChild(td); 
 } 
 table.appendChild(tr); 
 } 
 const tableContainer = document.getElementById('table-container'); 
 tableContainer.innerHTML = ''; 
 tableContainer.appendChild(table); 
}; 
// HTML 
// <input type="text" id="rows" placeholder="Number of rows"> 
// <input type="text" id="cols" placeholder="Number of columns"> 
// <button id="generate-table">Generate Table</button> 
// <div id="table-container"></div> 

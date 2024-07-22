class CheckboxTree { 
 constructor(data) { 
 this.data = data; 
 this.render(); 
 } 
 toggleCheckbox(node) { 
 node.checked = !node.checked; 
 if (node.children) { 

 node.children.forEach(child => this.toggleCheckboxRecursive(child, node.checked));  } 
 this.render(); 
 } 
 toggleCheckboxRecursive(node, checked) { 
 node.checked = checked; 
 if (node.children) { 
 node.children.forEach(child => this.toggleCheckboxRecursive(child, checked));  } 
 } 
 render() { 
 const container = document.getElementById('checkbox-tree'); 
 container.innerHTML = ''; 
 const renderNode = (node, parentElement) => { 
 const checkbox = document.createElement('input'); 
 checkbox.type = 'checkbox'; 
 checkbox.checked = node.checked; 
 checkbox.onchange = () => this.toggleCheckbox(node); 
 const label = document.createElement('label'); 
 label.appendChild(checkbox); 
 label.appendChild(document.createTextNode(node.label)); 
 const div = document.createElement('div'); 
 div.appendChild(label); 
 parentElement.appendChild(div); 
 if (node.children) { 
 node.children.forEach(child => renderNode(child, div)); 
 } 
 }; 
 this.data.forEach(node => renderNode(node, container)); 
 } 
} 
const data = [ 
 { 
 label: 'Parent 1', 
 checked: false, 
 children: [ 
 { label: 'Child 1.1', checked: false }, 
 { label: 'Child 1.2', checked: false }, 
 ] 
 }, 
 { 
 label: 'Parent 2', 
 checked: false, 
 children: [ 
 { label: 'Child 2.1', checked: false }, 
 { 
 label: 'Child 2.2', checked: false, 
 children: [ 
 { label: 'Grandchild 2.2.1', checked: false }, 
 { label: 'Grandchild 2.2.2', checked: false } 
 ] 
 } 
 ] 
 } 
]; 
const tree = new CheckboxTree(data); 

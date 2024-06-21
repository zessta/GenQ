### 23. Dynamic Form Builder 

**Question:** 
Create a dynamic form builder that generates a form based on a JSON schema. The form should support validation and handle form submissions. 
**Example:** 
```javascript 
class FormBuilder { 
 constructor(schema, containerId) { 
 this.schema = schema; 
 this.container = document.getElementById(containerId); 
 this.render(); 
 } 
 render() { 
 this.container.innerHTML = ''; 
 const form = document.createElement('form'); 
 this.schema.fields.forEach(field => { 
 const fieldElement = this.createField(field); 
 form.appendChild(fieldElement); 
 }); 
 const submitButton = document.createElement('button'); 
 submitButton.type = 'submit'; 
 submitButton.textContent = 'Submit'; 
 form.appendChild(submitButton); 
 form.onsubmit = this.handleSubmit.bind(this); 
 this.container.appendChild(form); 
 } 
 createField(field) { 
 const fieldWrapper = document.createElement('div'); 
 const label = document.createElement('label'); 
 label.textContent = field.label; 
 fieldWrapper.appendChild(label); 
 const input = document.createElement('input'); 
 input.type = field.type; 
 input.name = field.name; 
 input.required = field.required; 
 fieldWrapper.appendChild(input); 
 return fieldWrapper; 
 } 
 handleSubmit(event) { 
 event.preventDefault(); 
 const formData = new FormData(event.target); 
 const data = {}; 
 formData.forEach((value, key) => { 
 data[key] = value; 
 }); 
 if (this.validate(data)) { 
 console.log('Form data:', data); 
 } else { 
 console.log('Validation failed'); 
 } 
 } 
 validate(data) { 
 for (const field of this.schema.fields) { 
 if (field.required && !data[field.name]) { 
 return false; 
 } 
 } 
 return true; 

 } 
} 
const schema = { 
 fields: [ 
 { label: 'Name', name: 'name', type: 'text', required: true }, 
 { label: 'Email', name: 'email', type: 'email', required: true }, 
 { label: 'Password', name: 'password', type: 'password', required: true }  ] 
}; 
new FormBuilder(schema, 'form-container'); 
// HTML 
// <div id="form-container"></div> 
``` 

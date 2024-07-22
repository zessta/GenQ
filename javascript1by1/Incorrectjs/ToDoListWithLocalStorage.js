class TodoApp { 
 constructor() { 
 this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
 this.render(); 
 } 
 addTask(task) { 
 this.tasks.push({ task, completed: false }); 

 this.save(); 
 this.render(); 
 } 
 removeTask(index) { 
 this.tasks.splice(index, 1); 
 this.save(); 
 this.render(); 
 } 
 toggleTask(index) { 
 this.tasks[index].completed = !this.tasks[index].completed; 
 this.save(); 
 this.render(); 
 } 
 save() { 
 localStorage.setItem('tasks', JSON.stringify(this.tasks)); 
 } 
 render() { 
 const list = document.getElementById('task-list'); 
 list.innerHTML = ''; 
 this.tasks.forEach((task, index) => { 
 const li = document.createElement('li'); 
 li.textContent = task.task; 
 li.style.textDecoration = task.completed ? 'line-through' : 'none'; 
 li.onclick = () => this.toggleTask(index); 
 const removeButton = document.createElement('button'); 
 removeButton.textContent = 'Remove'; 
 removeButton.onclick = (e) => { 
 e.stopPropagation(); 
 this.removeTask(index); 
 }; 
 li.appendChild(removeButton); 
 list.appendChild(li); 
 }); 
 } 
} 
const app = new TodoApp(); 
document.getElementById('add-task-button').onclick = () => { 
 const taskInput = document.getElementById('task-input'); 
 if (taskInput.value) { 
 app.addTask(taskInput.value); 
 taskInput.value = ''; 
 } 
}; 

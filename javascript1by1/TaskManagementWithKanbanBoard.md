20. Task Management with Kanban Board
Description: Implement a task management application with a Kanban board interface. Skills Tested: DOM manipulation, drag-and-drop, data management. Features:

Create tasks and assign them to different columns (e.g., To Do, In Progress, Done).
Drag and drop tasks between columns.
Edit and delete tasks.
Store tasks in local storage for persistence. """
Sure, here's a testable HTML, CSS, and JavaScript code for a basic Kanban board application with some intentional mistakes introduced. The mistakes will help test the interviewee's understanding of the concepts.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanban Board</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .board {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }
        .column {
            width: 30%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .task {
            padding: 10px;
            margin: 10px 0;
            background-color: #fff;
            border: 1px solid #ddd;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Kanban Board</h1>
    <div>
        <input type="text" id="taskInput" placeholder="New task">
        <button onclick="addTask()">Add Task</button>
    </div>
    <div class="board">
        <div class="column" id="todo">
            <h2>To Do</h2>
        </div>
        <div class="column" id="in-progress">
            <h2>In Progress</h2>
        </div>
        <div class="column" id="done">
            <h2>Done</h2>
        </div>
    </div>


    <script>
        // Function to add a new task
        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value;
            if (taskText === '') return;


            const task = document.createElement('div');
            task.className = 'task';
            task.textContent = taskText;
            task.draggable = true;
            task.ondragstart = onDragStart;
            task.ondblclick = editTask;


            document.getElementById('todo').appendChild(task);
            taskInput.value = '';
            saveTasks();
        }


        // Function to handle drag start event
        function onDragStart(event) {
            event.dataTransfer.setData('text/plain', event.target.id);
        }


        // Function to handle drop event
        function onDrop(event) {
            event.preventDefault();
            const id = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            const dropzone = event.target;
            dropzone.appendChild(draggableElement);
            saveTasks();
        }


        // Function to handle drag over event
        function onDragOver(event) {
            event.preventDefault();
        }


        // Function to edit a task
        function editTask(event) {
            const newText = prompt('Edit task:', event.target.textContent);
            if (newText !== null) {
                event.target.textContent = newText;
                saveTasks();
            }
        }


        // Function to save tasks to local storage
        function saveTasks() {
            const columns = document.querySelectorAll('.column');
            const tasks = {};


            columns.forEach(column => {
                tasks[column.id] = [];
                column.querySelectorAll('.task').forEach(task => {
                    tasks[column.id].push(task.textContent);
                });
            });


            localStorage.setItem('tasks', JSON.stringify(tasks));
        }


        // Function to load tasks from local storage
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            if (!tasks) return;


            Object.keys(tasks).forEach(columnId => {
                const column = document.getElementById(columnId);
                tasks[columnId].forEach(taskText => {
                    const task = document.createElement('div');
                    task.className = 'task';
                    task.textContent = taskText;
                    task.draggable = true;
                    task.ondragstart = onDragStart;
                    task.ondblclick = editTask;
                    column.appendChild(task);
                });
            });
        }


        // Event listeners for drag and drop
        document.querySelectorAll('.column').forEach(column => {
            column.ondrop = onDrop;
            column.ondragover = onDragOver;
        });


        // Load tasks when the page loads
        window.onload = loadTasks;
    </script>
</body>
</html>
```

Intentional Mistakes:
Drag and Drop IDs: The tasks are not assigned unique IDs, which makes event.dataTransfer.setData('text/plain', event.target.id); ineffective since event.target.id is undefined.
Drop Event Handler: The onDrop event handler tries to append the dragged element directly to the drop zone, which may not work if the target is not a column.
Task Editing: The editTask function modifies the task text directly, but there is no mechanism to handle the case where the user cancels the prompt.
Persistence: The local storage does not handle the case where tasks is null or undefined.
CSS Styling: The visual styling of the tasks and columns is very basic, which can be improved for better user experience.
These mistakes will help test the interviewee's understanding of DOM manipulation, drag-and-drop, and data management concepts.

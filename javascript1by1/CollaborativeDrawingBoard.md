IPrompt8 = f""" Create a testable code that creates the following application and can be used on coding platforms like hackerrank or coderbyte. Introduce some mistakes to it so that you can test the interviewee with the main concepts mentioned:- . Collaborative Drawing Board Description: Create a collaborative drawing board where multiple users can draw on the same canvas in real-time. Skills Tested: WebSockets, Canvas API, event handling. Features:

Allow multiple users to connect and draw simultaneously.
Sync drawing actions in real-time using WebSockets.
Include tools for drawing lines, shapes, and text. """ Certainly! Below is a simplified version of a collaborative drawing board application using HTML, CSS, and JavaScript. This code includes some intentional mistakes to test the interviewee's understanding of WebSockets, Canvas API, and event handling.
index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative Drawing Board</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        canvas {
            border: 1px solid black;
        }
        .toolbar {
            position: absolute;
            top: 10px;
            left: 10px;
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <button id="line">Line</button>
        <button id="rectangle">Rectangle</button>
        <button id="text">Text</button>
    </div>
    <canvas id="drawingBoard" width="800" height="600"></canvas>
    <script src="app.js"></script>
</body>
</html>
app.js
const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');
const socket = new WebSocket('ws://localhost:8080'); // Intentional mistake: WebSocket server URL might be incorrect


let drawing = false;
let tool = 'line';
let startX, startY;


document.getElementById('line').addEventListener('click', () => tool = 'line');
document.getElementById('rectangle').addEventListener('click', () => tool = 'rectangle');
document.getElementById('text').addEventListener('click', () => tool = 'text');


canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    if (tool === 'line') {
        drawLine(startX, startY, e.offsetX, e.offsetY);
        sendDrawData('line', startX, startY, e.offsetX, e.offsetY);
        [startX, startY] = [e.offsetX, e.offsetY];
    }
});


canvas.addEventListener('mouseup', (e) => {
    drawing = false;
    if (tool === 'rectangle') {
        drawRectangle(startX, startY, e.offsetX - startX, e.offsetY - startY);
        sendDrawData('rectangle', startX, startY, e.offsetX - startX, e.offsetY - startY);
    }
});


socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    switch (data.tool) {
        case 'line':
            drawLine(data.startX, data.startY, data.endX, data.endY);
            break;
        case 'rectangle':
            drawRectangle(data.startX, data.startY, data.width, data.height);
            break;
        case 'text':
            drawText(data.text, data.x, data.y);
            break;
    }
});


function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


function drawRectangle(x, y, width, height) {
    ctx.strokeRect(x, y, width, height);
}


function drawText(text, x, y) {
    ctx.fillText(text, x, y); // Intentional mistake: Missing font settings
}


function sendDrawData(tool, startX, startY, endX, endY, text) {
    const data = { tool, startX, startY, endX, endY, text };
    socket.send(JSON.stringify(data)); // Intentional mistake: Missing error handling
}
```

Intentional Mistakes to Identify and Fix
WebSocket URL: The WebSocket URL might be incorrect or not configured properly.
Missing Font Settings: The drawText function does not set any font, which might be required.
Error Handling: The sendDrawData function does not handle any WebSocket errors.
Event Handling: The mousemove event handler does not handle the case where the tool is not 'line'.
WebSocket Connection: There is no error handling for the WebSocket connection itself.
The interviewee should identify and fix these issues to make the application fully functional.




Corrected Code
------------------
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative Drawing Board</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        canvas {
            border: 1px solid black;
        }
        .toolbar {
            position: absolute;
            top: 10px;
            left: 10px;
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <button id="line">Line</button>
        <button id="rectangle">Rectangle</button>
        <button id="text">Text</button>
    </div>
    <canvas id="drawingBoard" width="800" height="600"></canvas>
    <script src="app.js"></script>
</body>
</html>


<script>

    const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');
const socket = new WebSocket('ws://localhost:8080'); // Correct this URL as per your WebSocket server configuration

let drawing = false;
let tool = 'line';
let startX, startY;

document.getElementById('line').addEventListener('click', () => tool = 'line');
document.getElementById('rectangle').addEventListener('click', () => tool = 'rectangle');
document.getElementById('text').addEventListener('click', () => tool = 'text');

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    if (tool === 'line') {
        drawLine(startX, startY, e.offsetX, e.offsetY);
        sendDrawData('line', startX, startY, e.offsetX, e.offsetY);
        [startX, startY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', (e) => {
    drawing = false;
    if (tool === 'rectangle') {
        drawRectangle(startX, startY, e.offsetX - startX, e.offsetY - startY);
        sendDrawData('rectangle', startX, startY, e.offsetX - startX, e.offsetY - startY);
    } else if (tool === 'text') {
        const text = prompt('Enter text:');
        if (text) {
            drawText(text, startX, startY);
            sendDrawData('text', startX, startY, null, null, text);
        }
    }
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    switch (data.tool) {
        case 'line':
            drawLine(data.startX, data.startY, data.endX, data.endY);
            break;
        case 'rectangle':
            drawRectangle(data.startX, data.startY, data.width, data.height);
            break;
        case 'text':
            drawText(data.text, data.startX, data.startY);
            break;
    }
});

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRectangle(x, y, width, height) {
    ctx.strokeRect(x, y, width, height);
}

function drawText(text, x, y) {
    ctx.font = '16px Arial'; // Add font settings
    ctx.fillText(text, x, y);
}

function sendDrawData(tool, startX, startY, endX, endY, text) {
    const data = { tool, startX, startY, endX, endY, text };
    try {
        socket.send(JSON.stringify(data));
    } catch (error) {
        console.error('WebSocket error:', error); // Add error handling
    }
}

</script>

```

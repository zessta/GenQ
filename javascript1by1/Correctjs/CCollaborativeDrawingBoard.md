```html
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

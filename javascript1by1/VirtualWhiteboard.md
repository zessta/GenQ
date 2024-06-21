IPrompt26 = f"""
Create a testable code that creates the following application and can be used on coding platforms like hackerrank or coderbyte. Introduce some mistakes to it so that you can test the interviewee with the main concepts mentioned:-
### 37. **Virtual Whiteboard**
   **Description:** Create a virtual whiteboard for collaborative drawing and note-taking.
   **Skills Tested:** Canvas API, WebSockets, event handling.
   **Features:**
   - Allow multiple users to draw and write on the whiteboard in real-time.
   - Support drawing tools (e.g., pen, eraser, shapes).
   - Save and load whiteboard sessions.
   - Implement a chat feature for communication.
"""


Certainly! Below is a sample code for a virtual whiteboard application that incorporates the features listed. The code includes intentional mistakes to test the interviewee's understanding of the main concepts such as Canvas API, WebSockets, and event handling.


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Virtual Whiteboard</title>
    <style>
        #whiteboard {
            border: 1px solid black;
            width: 800px;
            height: 600px;
        }
        #toolbar {
            margin-bottom: 10px;
        }
        #chat {
            width: 300px;
            height: 600px;
            float: right;
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <div id="toolbar">
        <button id="pen">Pen</button>
        <button id="eraser">Eraser</button>
        <button id="save">Save</button>
        <button id="load">Load</button>
    </div>
    <canvas id="whiteboard"></canvas>
    <div id="chat">
        <div id="messages"></div>
        <input type="text" id="messageInput" />
        <button id="send">Send</button>
    </div>


    <script>
        const canvas = document.getElementById('whiteboard');
        const ctx = canvas.getContext('2d');
        const socket = new WebSocket('wss://example.com/socket');


        let drawing = false;
        let tool = 'pen';


        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });


        canvas.addEventListener('mousemove', (e) => {
            if (!drawing) return;
            if (tool === 'pen') {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            } else if (tool === 'eraser') {
                ctx.clearRect(e.offsetX, e.offsetY, 10, 10);
            }
            socket.send(JSON.stringify({ x: e.offsetX, y: e.offsetY, tool }));
        });


        canvas.addEventListener('mouseup', () => {
            drawing = false;
        });


        document.getElementById('pen').addEventListener('click', () => {
            tool = 'pen';
        });


        document.getElementById('eraser').addEventListener('click', () => {
            tool = 'eraser';
        });


        document.getElementById('save').addEventListener('click', () => {
            const data = canvas.toDataURL();
            localStorage.setItem('whiteboard', data);
        });


        document.getElementById('load').addEventListener('click', () => {
            const data = localStorage.getItem('whiteboard');
            const img = new Image();
            img.src = data;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        });


        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.tool === 'pen') {
                ctx.lineTo(data.x, data.y);
                ctx.stroke();
            } else if (data.tool === 'eraser') {
                ctx.clearRect(data.x, data.y, 10, 10);
            }
        };


        const messageInput = document.getElementById('messageInput');
        const messages = document.getElementById('messages');


        document.getElementById('send').addEventListener('click', () => {
            const message = messageInput.value;
            socket.send(JSON.stringify({ message }));
            messages.innerHTML += '<p>' + message + '</p>';
            messageInput.value = '';
        });


        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                messages.innerHTML += '<p>' + data.message + '</p>';
            }
        };
    </script>
</body>
</html>
```


### Intentional Mistakes:
1. **Canvas Size**: The canvas element does not have its width and height attributes set, which means it defaults to 300x150 pixels regardless of the CSS styles.
2. **WebSocket URL**: The WebSocket URL (`wss://example.com/socket`) is a placeholder and will not work in a real scenario.
3. **Duplicate `socket.onmessage`**: There are two `socket.onmessage` event handlers, which will cause one to overwrite the other.
4. **LocalStorage Save/Load**: The `load` button does not handle cases where there is no saved data in localStorage.
5. **Drawing Logic**: The drawing logic inside the `mousemove` event listener does not handle the initial `mousedown` position correctly for remote users.


These mistakes provide an opportunity to test the interviewee's ability to identify and correct issues related to the Canvas API, WebSockets, and event handling.

### 29. WebSocket Server with Authentication 
**Question:** 
Implement a WebSocket server in Node.js with authentication. Use the `ws` library for WebSocket communication. The server should authenticate clients using a token passed during the connection. 
**Example:** 
```javascript 
const WebSocket = require('ws'); 
const jwt = require('jsonwebtoken'); 
const wss = new WebSocket.Server({ port: 8080 }); 
function authenticate(token) { 
 try { 
 return jwt.verify(token, 'your_secret_key'); 
 } catch (err) { 
 return null; 
 } 
} 
wss.on('connection', (ws, req) => { 
 const token = req.url.split('token=')[1]; 
 const user = authenticate(token); 
 if (!user) { 

 ws.close(); 
 return; 
 } 
 ws.on('message', (message) => { 
 console.log('received:', message); 
 ws.send(`Hello, ${user.name}`); 
 }); 
 ws.send('Welcome to the WebSocket server!'); 
}); 
// Usage example 
const ws = new WebSocket('ws://localhost:8080?token=your_jwt_token'); 
ws.on('open', () => { 
 ws.send('Hello Server!'); 
}); 
ws.on('message', (data) => { 
 console.log(data); 
}); 
``` 

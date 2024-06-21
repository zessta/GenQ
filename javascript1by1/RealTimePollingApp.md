Real-time Polling App
Description: Develop a real-time polling app where users can create and participate in polls. Skills Tested: WebSockets, event handling, data visualization. Features:

Create polls with multiple choice questions.
Allow users to vote in real-time.
Display live results with charts.
Support multiple polls simultaneously. """ Certainly! Below is a sample code for a real-time polling app that introduces a few intentional mistakes. The code is designed to be testable on coding platforms like HackerRank or Coderbyte and incorporates WebSockets, event handling, and data visualization. The mistakes are included to test the interviewee's debugging skills and understanding of the main concepts.
Server-Side (Node.js with WebSocket)

```
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer();
const wss = new WebSocket.Server({ server });


let polls = {};


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'createPoll':
                const pollId = Math.random().toString(36).substring(2, 15); // Mistake: Potential collision
                polls[pollId] = {
                    question: data.question,
                    options: data.options,
                    votes: Array(data.options.length).fill(0)
                };
                ws.send(JSON.stringify({ type: 'pollCreated', pollId }));
                break;
            case 'vote':
                if (polls[data.pollId]) {
                    polls[data.pollId].votes[data.option]++;
                    broadcast(JSON.stringify({
                        type: 'updateResults',
                        pollId: data.pollId,
                        votes: polls[data.pollId].votes
                    }));
                }
                break;
            default:
                console.log('Unknown message type:', data.type);
        }
    });
});


function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}


server.listen(8080, function listening() {
    console.log('Server listening on port 8080');
});
Client-Side (HTML + JavaScript)
<!DOCTYPE html>
<html>
<head>
    <title>Real-time Polling App</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Real-time Polling App</h1>
    <div id="polls"></div>
    <script>
        const ws = new WebSocket('ws://localhost:8080');


        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'pollCreated':
                    addPoll(data.pollId);
                    break;
                case 'updateResults':
                    updateChart(data.pollId, data.votes);
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        };


        function createPoll(question, options) {
            ws.send(JSON.stringify({
                type: 'createPoll',
                question: question,
                options: options
            }));
        }


        function vote(pollId, option) {
            ws.send(JSON.stringify({
                type: 'vote',
                pollId: pollId,
                option: option
            }));
        }


        function addPoll(pollId) {
            const pollContainer = document.getElementById('polls');
            const pollDiv = document.createElement('div');
            pollDiv.id = pollId;
            pollDiv.innerHTML = `
                <h2>${polls[pollId].question}</h2>
                ${polls[pollId].options.map((opt, index) => `
                    <button onclick="vote('${pollId}', ${index})">${opt}</button>
                `).join('')}
                <canvas id="chart-${pollId}"></canvas>
            `;
            pollContainer.appendChild(pollDiv);
            createChart(pollId, polls[pollId].options);
        }


        function createChart(pollId, labels) {
            const ctx = document.getElementById(`chart-${pollId}`).getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Votes',
                        data: Array(labels.length).fill(0),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }


        function updateChart(pollId, votes) {
            const chart = Chart.getChart(`chart-${pollId}`);
            chart.data.datasets[0].data = votes; // Mistake: Chart update method might be wrong
            chart.update();
        }


        // Example usage
        createPoll('What is your favorite color?', ['Red', 'Green', 'Blue']);
    </script>
</body>
</html>
```

Intentional Mistakes
Server-Side:

Generating poll IDs using Math.random().toString(36).substring(2, 15) which can potentially lead to collisions.
Client-Side:

Referencing a non-existent polls object in addPoll function.
Incorrectly updating the Chart.js chart in updateChart function.
These mistakes are intended to test the interviewee's ability to debug and understand the code.

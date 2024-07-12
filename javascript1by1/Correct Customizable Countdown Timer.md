<html>

    <title>Customizable Countdown Timer</title>
</head>
<body>
    <h1>Customizable Countdown Timer</h1>
    <div>
        <label for="timer-input">Set Timer (in seconds): </label>
        <input type="number" id="timer-input" min="1">
        <button id="start-timer">Start Timer</button>
    </div>
    <div id="timers-container"></div>


    <script>
        document.getElementById('start-timer').addEventListener('click', function() {
            let inputTime = document.getElementById('timer-input').value;
            if (inputTime === "" || inputTime <= 0) {
                alert("Please enter a positive number.");
                return;
            }


            let timerContainer = document.createElement('div');
            timerContainer.className = 'timer';
            document.getElementById('timers-container').appendChild(timerContainer);


            let remainingTime = parseInt(inputTime, 10);
            let intervalId = setInterval(function() {
                let hours = Math.floor(remainingTime / 3600);
                let minutes = Math.floor((remainingTime % 3600) / 60);
                let seconds = remainingTime % 60;


                timerContainer.innerHTML = `${hours}h ${minutes}m ${seconds}s`;


                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    alert('Timer finished!');
                }


                remainingTime--;
            }, 1000);
        });
    </script>
</body>
</html>

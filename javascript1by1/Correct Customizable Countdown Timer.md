IPrompt1= f""" Create a testable code that creates the following application and can be used on coding platforms like hackerrank or coderbyte. Introduce some mistakes to it so that you can test the interviewee with the main concepts mentioned:- . Customizable Countdown Timer Description: Create a customizable countdown timer that users can set for different events. Skills Tested: DOM manipulation, time management, event handling. Features:

Allow users to input a countdown time.
Display the remaining time in hours, minutes, and seconds.
Play a sound or show an alert when the timer reaches zero.
Allow multiple timers to run simultaneously. """ Answer
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            if (inputTime <= 0) {
                alert("Please enter a positive number.");
                return;
            }


            let timerContainer = document.createElement('div');
            timerContainer.className = 'timer';
            document.getElementById('timers-container').appendChild(timerContainer);


            let remainingTime = inputTime;
            let intervalId = setInterval(function() {
                let hours = Math.floor(remainingTime / 3600);
                let minutes = Math.floor((remainingTime % 3600) / 60);
                let seconds = remainingTime % 60;


                timerContainer.innerHTML = `${hours}h ${minutes}m ${seconds}s`;


                if (remainingTime < 0) {
                    clearInterval(intervalId);
                    alert('Timer finished!');
                }


                remainingTime--;
            }, 1000);
        });
    </script>
</body>
</html>
Intentional Mistakes
Time reaches zero: The condition to clear the interval and alert the user should be remainingTime <= 0 instead of remainingTime < 0.
Input validation: The input validation checks for <= 0, but the input field is of type number which defaults to 0 if empty. We should handle empty input separately.
Negative input: The input type allows negative numbers because the min attribute is not enforced programmatically.
Multiple timers: The code does not handle multiple timers properly because it doesn't create unique interval IDs for each timer.
Corrected Code
Below is the corrected version of the code:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
This corrected code resolves the issues and properly handles multiple timers, input validation, and the condition when the timer reaches zero.

25. Virtual Pet Game
Description: Develop a virtual pet game where users can feed, play with, and take care of a virtual pet. Skills Tested: DOM manipulation, event handling, state management. Features:

Display the pet's health, hunger, and happiness levels.
Provide actions to feed, play with, and clean the pet.
Implement a simple AI to change the pet's state over time. """
To create a virtual pet game with intentional mistakes, we will focus on HTML, CSS, and JavaScript. The goal is to test the interviewee's understanding of DOM manipulation, event handling, and state management. Here is a basic implementation with some intentional errors:

HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Virtual Pet Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Virtual Pet Game</h1>
    <div id="pet">
        <p>Health: <span id="health">100</span></p>
        <p>Hunger: <span id="hunger">0</span></p>
        <p>Happiness: <span id="happiness">100</span></p>
    </div>
    <div id="actions">
        <button id="feed">Feed</button>
        <button id="play">Play</button>
        <button id="clean">Clean</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
CSS
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f0f0f0;
}


#pet {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
}


#actions {
    margin: 20px;
}


button {
    margin: 5px;
    padding: 10px;
    cursor: pointer;
}
JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let health = 100;
    let hunger = 0;
    let happiness = 100;


    const healthSpan = document.getElementById('health');
    const hungerSpan = document.getElementById('hunger');
    const happinessSpan = document.getElementById('happiness');


    document.getElementById('feed').addEventListener('click', function() {
        hunger -= 10;
        if (hunger < 0) hunger = 0;
        updateStats();
    });


    document.getElementById('play').addEventListener('click', function() {
        happiness += 10;
        if (happiness > 100) happiness = 100;
        updateStats();
    });


    document.getElementById('clean').addEventListener('click', function() {
        health += 10;
        if (health > 100) health = 100;
        updateStats();
    });


    function updateStats() {
        healthSpan.innerText = health;
        hungerSpan.innerText = hunger;
        happinessSpan.innerText = happiness;
    }


    function petAI() {
        health -= 5;
        hunger += 5;
        happiness -= 5;


        if (health < 0) health = 0;
        if (hunger > 100) hunger = 100;
        if (happiness < 0) happiness = 0;


        updateStats();


        // Call petAI every 5 seconds
        setTimeout(petAI, 5000);
    }


    petAI();
});
Intentional Mistakes
The clean button should likely reduce hunger instead of increasing health.
The petAI function should be called with setInterval instead of setTimeout within itself to avoid multiple timeouts being created over time.
The initial state update is missing after the DOM content is loaded.
The clean button's functionality is not clearly defined in the requirements, so it might be confusing. It should perhaps affect cleanliness if there was such a property.
These intentional mistakes will help test the interviewee's ability to spot and fix issues related to DOM manipulation, event handling, and state management.

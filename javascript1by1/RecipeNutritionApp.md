Recipe Nutrition Calculator
Description: Create a nutrition calculator for recipes to analyze the nutritional content. Skills Tested: API interaction, data handling, DOM manipulation. Features:

Input recipe ingredients with quantities.
Fetch nutritional data from a nutrition API.
Calculate and display total calories, macronutrients, and micronutrients.
Save and load recipes for future use. """
Sure, here's a testable code for a Recipe Nutrition Calculator with some deliberate mistakes to test the interviewee's understanding. This code is designed to be run in a web environment where HTML, CSS, and JavaScript are utilized. You can use this code on platforms like HackerRank or Coderbyte by setting up the appropriate environment.

index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Nutrition Calculator</title>
</head>
<body>
    <h1>Recipe Nutrition Calculator</h1>
    <div>
        <input type="text" id="ingredient" placeholder="Enter ingredient and quantity">
        <button onclick="addIngredient()">Add Ingredient</button>
    </div>
    <ul id="ingredientList"></ul>
    <button onclick="calculateNutrition()">Calculate Nutrition</button>
    <div id="nutritionResults"></div>
    <button onclick="saveRecipe()">Save Recipe</button>
    <button onclick="loadRecipe()">Load Recipe</button>


    <script src="app.js"></script>
</body>
</html>
app.js

let ingredients = [];


function addIngredient() {
    const ingredientInput = document.getElementById('ingredient');
    const ingredient = ingredientInput.value;
    if (ingredient) {
        ingredients.push(ingredient);
        const ingredientList = document.getElementById('ingredientList');
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientList.appendChild(li);
        ingredientInput.value = '';
    }
}


function calculateNutrition() {
    const apiUrl = 'https://api.nutritionix.com/v1_1/search/';
    const appId = 'YOUR_APP_ID';  // Mistake: Replace with actual App ID
    const appKey = 'YOUR_APP_KEY';  // Mistake: Replace with actual App Key


    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalFats = 0;


    ingredients.forEach(ingredient => {
        fetch(`${apiUrl}${ingredient}?results=0:1&fields=nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat&appId=${appId}&appKey=${appKey}`)
            .then(response => response.json())
            .then(data => {
                const nutrition = data.hits[0].fields;
                totalCalories += nutrition.nf_calories;
                totalCarbs += nutrition.nf_total_carbohydrate;
                totalProteins += nutrition.nf_protein;
                totalFats += nutrition.nf_total_fat;
            })
            .catch(error => console.error('Error:', error));
    });


    setTimeout(() => {  // Mistake: Incorrectly using setTimeout to handle async operations
        const resultsDiv = document.getElementById('nutritionResults');
        resultsDiv.innerHTML = `
            <p>Total Calories: ${totalCalories}</p>
            <p>Total Carbohydrates: ${totalCarbs}g</p>
            <p>Total Proteins: ${totalProteins}g</p>
            <p>Total Fats: ${totalFats}g</p>
        `;
    }, 2000);
}


function saveRecipe() {
    localStorage.setItem('savedRecipe', JSON.stringify(ingredients));  // Mistake: No error handling for localStorage operations
    alert('Recipe saved!');
}


function loadRecipe() {
    const savedRecipe = localStorage.getItem('savedRecipe');
    if (savedRecipe) {
        ingredients = JSON.parse(savedRecipe);
        const ingredientList = document.getElementById('ingredientList');
        ingredientList.innerHTML = '';
        ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientList.appendChild(li);
        });
    } else {
        alert('No saved recipe found!');
    }
}
Mistakes Introduced:
Hardcoded API keys: The code contains placeholders for the API keys (YOUR_APP_ID and YOUR_APP_KEY). The interviewee should replace these with actual values.
Improper async handling: The use of setTimeout to handle asynchronous operations is incorrect. The interviewee should use proper promise chaining or async/await.
No error handling for localStorage operations: The code does not handle errors that may occur when saving or loading from localStorage.
No validation or sanitization of user input: The code does not validate or sanitize the user input for ingredients.
Skills Tested:
API interaction: Fetching data from an external API.
Data handling: Aggregating nutritional information from multiple API responses.
DOM manipulation: Updating the DOM with ingredient lists and nutritional information.
Error handling and async operations: Properly managing asynchronous operations and potential errors.
Instructions for the Interviewee:
Replace the placeholder API keys with actual values.
Fix the asynchronous handling for fetching nutritional data.
Implement error handling for localStorage operations.
Add input validation and sanitization for the ingredient input.

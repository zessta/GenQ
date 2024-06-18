IPrompt4 = f""" Create a testable code that creates the following application and can be used on coding platforms like hackerrank or coderbyte. Introduce some mistakes to it so that you can test the interviewee with the main concepts mentioned:- Budget Planning App Description: Build an app to help users plan their monthly budget by categorizing expenses and incomes. Skills Tested: Data management, DOM manipulation, event handling. Features:

Allow users to add, edit, and delete income and expenses.
Categorize income and expenses (e.g., rent, groceries, entertainment).
Display a summary of total income, total expenses, and balance.
Visualize data using charts (e.g., pie chart for expense categories). """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Ingredient Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .ingredient {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Recipe Ingredient Calculator</h1>
    <div>
        <label for="servings">Number of servings:</label>
        <input type="number" id="servings" value="4">
    </div>
    <div id="ingredients">
        <div class="ingredient">
            <span class="name">Flour:</span>
            <span class="quantity">2</span> cups
        </div>
        <div class="ingredient">
            <span class="name">Sugar:</span>
            <span class="quantity">1.5</span> cups
        </div>
        <div class="ingredient">
            <span class="name">Butter:</span>
            <span class="quantity">1</span> cup
        </div>
    </div>
    <script>
        document.getElementById('servings').addEventListener('input', function() {
            var newServings = parseInt(this.value);
            if (isNaN(newServings) || newServings <= 0) {
                return;
            }


            var defaultServings = 4;
            var ingredients = document.querySelectorAll('.ingredient');
            ingredients.forEach(function(ingredient) {
                var quantityElement = ingredient.querySelector('.quantity');
                var quantity = parseFloat(quantityElement.textContent);
                var updatedQuantity = (quantity / defaultServings) * newServings;
                quantityElement.textContent = updatedQuantity.toFixed(1);
            });
        });
    </script>
</body>
</html>
Intentional Mistakes:
The defaultServings variable is hardcoded inside the event listener. It should be outside to avoid recalculating it every time the input changes.
The parseInt(this.value) should be parseFloat(this.value) to handle fractional servings correctly.
The event listener should handle the case where the input is emptied or invalid, by resetting the ingredient quantities to their original values.
Corrected Code:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Ingredient Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .ingredient {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Recipe Ingredient Calculator</h1>
    <div>
        <label for="servings">Number of servings:</label>
        <input type="number" id="servings" value="4">
    </div>
    <div id="ingredients">
        <div class="ingredient">
            <span class="name">Flour:</span>
            <span class="quantity">2</span> cups
        </div>
        <div class="ingredient">
            <span class="name">Sugar:</span>
            <span class="quantity">1.5</span> cups
        </div>
        <div class="ingredient">
            <span class="name">Butter:</span>
            <span class="quantity">1</span> cup
        </div>
    </div>
    <script>
        var defaultServings = 4;
        var originalQuantities = [];


        document.querySelectorAll('.quantity').forEach(function(element) {
            originalQuantities.push(parseFloat(element.textContent));
        });


        document.getElementById('servings').addEventListener('input', function() {
            var newServings = parseFloat(this.value);
            if (isNaN(newServings) || newServings <= 0) {
                document.querySelectorAll('.quantity').forEach(function(element, index) {
                    element.textContent = originalQuantities[index];
                });
                return;
            }


            var ingredients = document.querySelectorAll('.ingredient');
            ingredients.forEach(function(ingredient, index) {
                var quantityElement = ingredient.querySelector('.quantity');
                var updatedQuantity = (originalQuantities[index] / defaultServings) * newServings;
                quantityElement.textContent = updatedQuantity.toFixed(1);
            });
        });
    </script>
</body>
</html>
This corrected code ensures that the default servings are defined outside the event listener, handles fractional servings correctly, and resets the ingredient quantities if the input is invalid.

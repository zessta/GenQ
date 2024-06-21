Expense Tracker with Visualization
Description: Develop an expense tracker that visualizes spending habits. Skills Tested: Data handling, DOM manipulation, data visualization. Features:

Add, edit, and delete expenses with categories.
Display total expenses and breakdown by category.
Visualize spending habits with charts (e.g., bar chart, pie chart). """ Certainly! Below is a JavaScript code snippet that creates a basic expense tracker with visualization capabilities. The code includes intentional mistakes to test the interviewee's understanding of data handling, DOM manipulation, and data visualization. The code is designed to be tested on platforms like HackerRank or Coderbyte.
<!DOCTYPE html>
<html>
<head>
    <title>Expense Tracker</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Expense Tracker</h1>
    <form id="expense-form">
        <input type="text" id="description" placeholder="Description" required>
        <input type="number" id="amount" placeholder="Amount" required>
        <select id="category">
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
        </select>
        <button type="submit">Add Expense</button>
    </form>
    
    <h2>Total Expenses: <span id="total-expenses">0</span></h2>
    <h3>Breakdown by Category</h3>
    <ul id="expense-list"></ul>
    
    <canvas id="expense-chart" width="400" height="200"></canvas>


    <script>
        let expenses = [];
        let categories = { 'Food': 0, 'Transport': 0, 'Entertainment': 0 };
        
        document.getElementById('expense-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let description = document.getElementById('description').value;
            let amount = parseInt(document.getElementById('amount').value);
            let category = document.getElementById('category').value;
            
            expenses.push({ description, amount, category });
            categories[category] += amount;
            
            updateExpenses();
            updateChart();
        });
        
        function updateExpenses() {
            let totalExpenses = 0;
            let expenseList = document.getElementById('expense-list');
            expenseList.innerHTML = '';
            
            expenses.forEach(function(expense) {
                totalExpenses += expense.amount;
                let li = document.createElement('li');
                li.textContent = `${expense.description} - $${expense.amount} (${expense.category})`;
                expenseList.appendChild(li);
            });
            
            document.getElementById('total-expenses').textContent = totalExpenses;
        }
        
        function updateChart() {
            let ctx = document.getElementById('expense-chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Food', 'Transport', 'Entertainment'],
                    datasets: [{
                        label: 'Expenses by Category',
                        data: Object.values(categories),
                        backgroundColor: ['red', 'blue', 'green'],
                    }],
                },
            });
        }


        // Intentional mistakes:
        // - Description should be reset after adding an expense.
        // - Amount should be reset after adding an expense.
        // - Chart should be updated correctly without overlapping.
    </script>
</body>
</html>
Intentional Mistakes:
The description field is not reset after submitting the form.
The amount field is not reset after submitting the form.
The chart is not properly updated; it creates a new chart each time instead of updating the existing one.
The interviewee should be able to identify and fix these issues:

Reset the description and amount fields after adding an expense.
Ensure the chart updates correctly without overlapping previous data.

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
    <title>Budget Planning App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
        }
        .summary {
            display: flex;
            justify-content: space-between;
        }
        .entry {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .entry input, .entry select {
            margin-right: 10px;
        }
        #chart {
            width: 100%;
            height: 400px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Budget Planning App</h1>
        <div class="summary">
            <div>Total Income: <span id="totalIncome">0</span></div>
            <div>Total Expenses: <span id="totalExpenses">0</span></div>
            <div>Balance: <span id="balance">0</span></div>
        </div>
        <div>
            <h2>Add Entry</h2>
            <div class="entry">
                <input type="text" id="description" placeholder="Description">
                <input type="number" id="amount" placeholder="Amount">
                <select id="category">
                    <option value="income">Income</option>
                    <option value="rent">Rent</option>
                    <option value="groceries">Groceries</option>
                    <option value="entertainment">Entertainment</option>
                </select>
                <button id="addEntryBtn">Add</button>
            </div>
        </div>
        <div>
            <h2>Entries</h2>
            <div id="entries"></div>
        </div>
        <div id="chart"></div>
    </div>

    <script>
        const totalIncomeElem = document.getElementById('totalIncome');
        const totalExpensesElem = document.getElementById('totalExpenses');
        const balanceElem = document.getElementById('balance');
        const descriptionInput = document.getElementById('description');
        const amountInput = document.getElementById('amount');
        const categorySelect = document.getElementById('category');
        const addEntryBtn = document.getElementById('addEntryBtn');
        const entriesContainer = document.getElementById('entries');

        let totalIncome = 0;
        let totalExpenses = 0;
        const entries = [];

        addEntryBtn.addEventListener('click', addEntry);

        function addEntry() {
            const description = descriptionInput.value;
            const amount = parseFloat(amountInput.value);
            const category = categorySelect.value;

            if (!description || isNaN(amount)) {
                alert('Please enter valid description and amount.');
                return;
            }

            const entry = { description, amount, category };
            entries.push(entry);

            const entryElem = document.createElement('div');
            entryElem.classList.add('entry');
            entryElem.innerHTML = `
                <span>${description}</span>
                <span>${amount}</span>
                <span>${category}</span>
                <button class="deleteBtn">Delete</button>
            `;
            entriesContainer.appendChild(entryElem);

            entryElem.querySelector('.deleteBtn').addEventListener('click', () => {
                entriesContainer.removeChild(entryElem);
                const index = entries.indexOf(entry);
                if (index > -1) {
                    entries.splice(index, 1);
                }
                updateSummary();
            });

            updateSummary();
        }

        function updateSummary() {
            totalIncome = entries.reduce((sum, entry) => entry.category === 'income' ? sum + entry.amount : sum, 0);
            totalExpenses = entries.reduce((sum, entry) => entry.category !== 'income' ? sum + entry.amount : sum, 0);
            const balance = totalIncome - totalExpenses;

            totalIncomeElem.textContent = totalIncome.toFixed(2);
            totalExpensesElem.textContent = totalExpenses.toFixed(2);
            balanceElem.textContent = balance.toFixed(2);

            drawChart();
        }

        function drawChart() {
            const expensesByCategory = entries
                .filter(entry => entry.category !== 'income')
                .reduce((acc, entry) => {
                    acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
                    return acc;
                }, {});

            const chartData = Object.entries(expensesByCategory).map(([category, amount]) => {
                return { category, amount };
            });

            const chartElem = document.getElementById('chart');
            chartElem.innerHTML = '';

            const totalExpenses = chartData.reduce((sum, entry) => sum + entry.amount, 0);
            chartData.forEach(entry => {
                const bar = document.createElement('div');
                bar.style.width = (entry.amount / totalExpenses * 100) + '%';
                bar.style.height = '20px';
                bar.style.backgroundColor = getRandomColor();
                bar.textContent = `${entry.category} (${entry.amount})`;
                chartElem.appendChild(bar);
            });
        }

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    </script>
</body>
</html>


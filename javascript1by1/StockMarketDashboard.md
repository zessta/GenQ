 Stock Market Dashboard
Description: Build a stock market dashboard that displays real-time stock prices and historical data. Skills Tested: API interaction, data visualization, DOM manipulation. Features:

Fetch real-time stock prices from a financial API.
Display price charts with historical data.
Allow users to search for and track specific stocks.
Visualize portfolio performance over time. """
<!DOCTYPE html>
<html>
<head>
    <title>Stock Market Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Stock Market Dashboard</h1>
    <input type="text" id="stockSymbol" placeholder="Enter Stock Symbol">
    <button onclick="fetchStockData()">Get Stock Data</button>
    <canvas id="priceChart" width="400" height="200"></canvas>


    <script>
        async function fetchStockData() {
            const symbol = document.getElementById('stockSymbol').value;
            const apiKey = 'YOUR_API_KEY';
            const apiUrl = `https://api.financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
            
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                if (data.length === 0) {
                    alert('No data found for the given stock symbol');
                    return;
                }


                const priceData = data[0].price;
                displayChart(priceData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        }


        function displayChart(priceData) {
            const ctx = document.getElementById('priceChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Stock Price',
                        data: priceData, // Intentional mistake: This should be an array of historical prices, not a single price
                        borderColor: 'rgba(75, 192, 192, 1)',
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
    </script>
</body>
</html>
Intentional Mistakes:
API Key Placeholder: The apiKey variable is set to 'YOUR_API_KEY'. This is a placeholder and will not work until replaced with a valid API key.
Incorrect priceData Usage: In the displayChart function, priceData is expected to be an array of historical prices but is actually a single price value.
Real-Time Data Misconception: The script fetches only the current price, whereas real-time data should ideally involve continuous updates.
Historical Data Missing: The script does not fetch historical data; it only fetches the current price.
Instructions for Interviewee:
Replace the placeholder API key with a valid key from a financial data provider.
Modify the code to fetch historical stock prices instead of just the current price.
Ensure that the displayChart function correctly uses an array of historical prices.
Optionally, implement a mechanism to periodically update the stock prices to simulate real-time data.
Below is a sample code for a language learning app with some intentional mistakes. The code demonstrates data management, DOM manipulation, and API interaction. The interviewee will need to identify and fix the mistakes to make the application fully functional.

IPrompt13 = f""" Create a testable code that creates the following application and can be used on coding platforms like hackerrank or coderbyte. Introduce some mistakes to it so that you can test the interviewee with the main concepts mentioned:-

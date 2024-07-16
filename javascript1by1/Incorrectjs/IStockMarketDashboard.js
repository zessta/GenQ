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

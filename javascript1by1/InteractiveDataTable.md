24. Interactive Data Table
Description: Create an interactive data table that supports sorting, filtering, and pagination. Skills Tested: DOM manipulation, data handling, event handling. Features:

Load data from a JSON file or an API.
Allow users to sort columns by clicking on headers.
Implement filters to search and narrow down results.
Add pagination controls to navigate through large datasets. """ Certainly! Below is a testable code snippet for an interactive data table with some intentional mistakes. This code is designed to be used on coding platforms like HackerRank or Coderbyte. The code includes features like sorting, filtering, and pagination, but with some errors that should be identified and fixed by the interviewee.
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Data Table</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            cursor: pointer;
        }
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }
        .pagination button {
            margin: 0 5px;
            padding: 5px 10px;
        }
    </style>
</head>
<body>
    <input type="text" id="search" placeholder="Search...">
    <table id="dataTable">
        <thead>
            <tr>
                <th data-column="name">Name</th>
                <th data-column="age">Age</th>
                <th data-column="city">City</th>
            </tr>
        </thead>
        <tbody>
            <!-- Data will be populated here -->
        </tbody>
    </table>
    <div class="pagination">
        <button id="prevPage">Previous</button>
        <span id="pageInfo">Page 1</span>
        <button id="nextPage">Next</button>
    </div>
    <script>
        const dataUrl = 'data.json'; // Assume this JSON file contains the data
        const rowsPerPage = 5;
        let currentPage = 1;
        let data = [];
        let filteredData = [];


        document.addEventListener('DOMContentLoaded', async () => {
            data = await fetchData();
            filteredData = data;
            renderTable();
        });


        document.getElementById('search').addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            filteredData = data.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.age.toString().includes(searchTerm) ||
                item.city.toLowerCase().includes(searchTerm)
            );
            currentPage = 1;
            renderTable();
        });


        document.querySelectorAll('th').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-column');
                filteredData.sort((a, b) => a[column] > b[column] ? 1 : -1);
                renderTable();
            });
        });


        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });


        document.getElementById('nextPage').addEventListener('click', () => {
            if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
                currentPage++;
                renderTable();
            }
        });


        async function fetchData() {
            try {
                const response = await fetch(dataUrl);
                return await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        }


        function renderTable() {
            const tbody = document.querySelector('#dataTable tbody');
            tbody.innerHTML = '';


            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedData = filteredData.slice(start, end);


            paginatedData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.name}</td><td>${item.age}</td><td>${item.city}</td>`;
                tbody.appendChild(row);
            });


            document.getElementById('pageInfo').textContent = `Page ${currentPage}`;
        }
    </script>
</body>
</html>
Intentional Mistakes:
Sorting Issue: The sorting function only sorts in ascending order and does not toggle between ascending and descending.
Pagination Info: The page info does not update correctly when filtering the data.
Event Delegation: The event listeners for sorting headers are attached before the data is loaded, which might not work correctly if headers are dynamically generated.
Error Handling: The fetchData function does not handle fetch errors gracefully.
These mistakes are intended to test the interviewee's understanding of DOM manipulation, data handling, and event handling. They should identify and correct these issues to ensure the application works as expected.

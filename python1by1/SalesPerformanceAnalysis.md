Question 10

Certainly! Here's a more complex scenario that tests advanced Pandas concepts such as multi-level indexing, handling missing data, and pivot operations:

0 - Real-life Application of Pandas: Sales Performance Analysis

1 - Scenario:
You are analyzing the sales performance of different products across multiple regions over several years. Your task involves cleaning the data, handling missing values, creating multi-level indexes, and generating pivot tables to summarize the sales data.

2 - Buggy Code:
```python
import pandas as pd

# Load sales data
df = pd.read_csv('sales_data.csv')

# Convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Extract year and month from 'Date'
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month

# Fill missing values with zero
df.fillna(0, inplace=True)

# Set multi-level index using 'Region' and 'Product'
df.set_index(['Region', 'Product'], inplace=True)

# Calculate total sales by year and month
total_sales = df.groupby(['Year', 'Month'])['Sales'].sum().unstack()

# Create pivot table to show sales by region and product
pivot_table = df.pivot(index='Year', columns='Region', values='Sales')

# Save the results to new CSV files
total_sales.to_csv('total_sales.csv')
pivot_table.to_csv('pivot_table.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to analyze sales performance by handling missing data, creating a multi-level index, and generating pivot tables. However, it has issues with the multi-level index, incorrect grouping for total sales, and the pivot table creation.

5 - Answer:
The corrected code should properly set the multi-level index, correctly group data for total sales, and accurately create the pivot table.
```python
import pandas as pd

# Load sales data
df = pd.read_csv('sales_data.csv')

# Convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Extract year and month from 'Date'
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month

# Fill missing values with zero for 'Sales' column only
df['Sales'].fillna(0, inplace=True)

# Set multi-level index using 'Region' and 'Product'
df.set_index(['Region', 'Product'], inplace=True)

# Calculate total sales by year and month
total_sales = df.groupby(['Year', 'Month', 'Region', 'Product'])['Sales'].sum().unstack(level=[2, 3])

# Create pivot table to show sales by region and product
pivot_table = df.reset_index().pivot_table(index='Year', columns=['Region', 'Product'], values='Sales', aggfunc='sum')

# Save the results to new CSV files
total_sales.to_csv('total_sales.csv')
pivot_table.to_csv('pivot_table.csv')
```
In the corrected code, we fill missing values specifically for the 'Sales' column. We use a multi-level index properly and ensure that the grouping for total sales includes all relevant levels. We also correctly create the pivot table by resetting the index and using the `pivot_table` method with appropriate aggregation functions. This ensures accurate and comprehensive sales performance analysis.

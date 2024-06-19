Question 9

Certainly! Here's a scenario that tests advanced Pandas concepts, focusing on data merging, handling time series data, and complex groupby operations:

0 - Real-life Application of Pandas: Energy Consumption Analysis

1 - Scenario:
You are working on a project where you need to analyze energy consumption data from multiple sources to understand usage patterns and identify potential areas for energy savings. Your task involves merging datasets, handling time series data, and performing advanced aggregations.

2 - Buggy Code:
```python
import pandas as pd

# Load energy consumption data from two different sources
df1 = pd.read_csv('energy_data_source1.csv')
df2 = pd.read_csv('energy_data_source2.csv')

# Convert 'Timestamp' columns to datetime
df1['Timestamp'] = pd.to_datetime(df1['Timestamp'])
df2['Timestamp'] = pd.to_datetime(df2['Timestamp'])

# Merge the two datasets on 'Timestamp'
merged_df = pd.merge(df1, df2, on='Timestamp')

# Fill missing values with the forward fill method
merged_df.fillna(method='ffill', inplace=True)

# Calculate the total energy consumption by day
merged_df['Date'] = merged_df['Timestamp'].dt.date
daily_consumption = merged_df.groupby('Date')['Consumption'].sum()

# Identify peak consumption hours
merged_df['Hour'] = merged_df['Timestamp'].dt.hour
peak_hours = merged_df.groupby('Hour')['Consumption'].sum().sort_values(ascending=False).head(5)

# Save the results to new CSV files
daily_consumption.to_csv('daily_consumption.csv')
peak_hours.to_csv('peak_hours.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to merge energy consumption data from two different sources and perform advanced aggregations. However, it has issues with handling overlapping columns, accurately aggregating consumption data, and properly dealing with time series data.

5 - Answer:
The corrected code should handle overlapping columns appropriately during the merge, ensure accurate aggregation of consumption data, and handle time series data correctly.
```python
import pandas as pd

# Load energy consumption data from two different sources
df1 = pd.read_csv('energy_data_source1.csv')
df2 = pd.read_csv('energy_data_source2.csv')

# Convert 'Timestamp' columns to datetime
df1['Timestamp'] = pd.to_datetime(df1['Timestamp'])
df2['Timestamp'] = pd.to_datetime(df2['Timestamp'])

# Rename columns to avoid overlapping during merge
df1.rename(columns={'Consumption': 'Consumption_source1'}, inplace=True)
df2.rename(columns={'Consumption': 'Consumption_source2'}, inplace=True)

# Merge the two datasets on 'Timestamp'
merged_df = pd.merge(df1, df2, on='Timestamp', how='outer')

# Fill missing values with the forward fill method
merged_df.fillna(method='ffill', inplace=True)

# Calculate the total energy consumption by adding both sources
merged_df['Total_Consumption'] = merged_df['Consumption_source1'] + merged_df['Consumption_source2']

# Calculate the total energy consumption by day
merged_df['Date'] = merged_df['Timestamp'].dt.date
daily_consumption = merged_df.groupby('Date')['Total_Consumption'].sum().reset_index()

# Identify peak consumption hours
merged_df['Hour'] = merged_df['Timestamp'].dt.hour
peak_hours = merged_df.groupby('Hour')['Total_Consumption'].sum().sort_values(ascending=False).head(5).reset_index()

# Save the results to new CSV files
daily_consumption.to_csv('daily_consumption.csv', index=False)
peak_hours.to_csv('peak_hours.csv', index=False)
```
In the corrected code, we rename overlapping columns before merging to avoid conflicts. We ensure that missing values are handled using the forward fill method. We calculate the total energy consumption by summing the consumption from both sources. We also properly reset the index when saving the results to CSV files to ensure the data is accurately recorded.

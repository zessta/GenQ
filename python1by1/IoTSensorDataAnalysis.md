Question 11

Sure! Here’s another scenario focusing on advanced Pandas concepts such as merging, resampling time series data, and handling hierarchical indexing:

0 - Real-life Application of Pandas: IoT Sensor Data Analysis

1 - Scenario:
You are working on a project where you need to analyze IoT sensor data collected from multiple devices across various locations. Your task involves cleaning the data, merging datasets, resampling the time series data, and summarizing the data to identify trends and anomalies.

2 - Buggy Code:
```python
import pandas as pd

# Load sensor data from multiple files
df1 = pd.read_csv('sensor_data_1.csv')
df2 = pd.read_csv('sensor_data_2.csv')

# Convert 'Timestamp' column to datetime
df1['Timestamp'] = pd.to_datetime(df1['Timestamp'])
df2['Timestamp'] = pd.to_datetime(df2['Timestamp'])

# Merge the dataframes on 'Timestamp' and 'Device ID'
df_merged = pd.merge(df1, df2, on=['Timestamp', 'Device ID'])

# Fill missing values with forward fill method
df_merged.fillna(method='ffill', inplace=True)

# Set multi-level index with 'Device ID' and 'Location'
df_merged.set_index(['Device ID', 'Location'], inplace=True)

# Resample the data to hourly frequency and calculate mean values
df_resampled = df_merged.resample('H').mean()

# Calculate the rolling mean with a window of 24 hours
df_resampled['Rolling_Mean'] = df_resampled['Sensor Value'].rolling(window=24).mean()

# Save the results to new CSV file
df_resampled.to_csv('resampled_sensor_data.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to merge IoT sensor data, resample it, and calculate rolling mean values. However, it has issues with correctly merging the dataframes, handling hierarchical indexing for resampling, and calculating the rolling mean.

5 - Answer:
The corrected code should properly merge the dataframes on the correct keys, handle hierarchical indexing, resample the data correctly, and calculate the rolling mean.
```python
import pandas as pd

# Load sensor data from multiple files
df1 = pd.read_csv('sensor_data_1.csv')
df2 = pd.read_csv('sensor_data_2.csv')

# Convert 'Timestamp' column to datetime
df1['Timestamp'] = pd.to_datetime(df1['Timestamp'])
df2['Timestamp'] = pd.to_datetime(df2['Timestamp'])

# Merge the dataframes on 'Timestamp' and 'Device ID'
df_merged = pd.merge(df1, df2, on=['Timestamp', 'Device ID'], how='outer')

# Fill missing values with forward fill method
df_merged.fillna(method='ffill', inplace=True)

# Set multi-level index with 'Device ID', 'Location', and 'Timestamp'
df_merged.set_index(['Device ID', 'Location', 'Timestamp'], inplace=True)

# Resample the data to hourly frequency and calculate mean values
df_resampled = df_merged.groupby(['Device ID', 'Location']).resample('H', level=2).mean()

# Calculate the rolling mean with a window of 24 hours
df_resampled['Rolling_Mean'] = df_resampled['Sensor Value'].groupby(level=0).rolling(window=24).mean().reset_index(level=0, drop=True)

# Save the results to new CSV file
df_resampled.to_csv('resampled_sensor_data.csv')
```
In the corrected code, we:
- Merge the dataframes using `how='outer'` to ensure no data is lost.
- Properly handle multi-level indexing by setting `Device ID`, `Location`, and `Timestamp` as the index.
- Resample the data to hourly frequency using the `resample` method with `level=2` to specify the `Timestamp` level.
- Calculate the rolling mean for each device separately by grouping the data and then applying the `rolling` method.

This ensures that the data is merged, resampled, and summarized correctly, providing accurate insights into IoT sensor data trends and anomalies.


Question 4

0 - Real-life Application of Pandas: Sensor Data Analysis

1 - Scenario:
You are working on a project where you need to analyze sensor data collected from various IoT devices deployed in a manufacturing plant. Your task involves preprocessing the sensor data, identifying anomalies, and generating insights to optimize manufacturing processes.

2 - Buggy Code:
```python
import pandas as pd

# Load sensor data
df = pd.read_csv('sensor_data.csv')

# Drop rows with missing values
df.dropna(inplace=True)

# Convert 'Timestamp' column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Calculate rolling average temperature for a 10-minute window
df['Rolling_Avg_Temperature'] = df['Temperature'].rolling(window='10T').mean()

# Identify anomalies in temperature
df['Anomaly'] = df['Temperature'] > df['Rolling_Avg_Temperature'] + 2 * df['Temperature'].std()

# Save the result to a new CSV file
df.to_csv('processed_sensor_data.csv', index=False)
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to preprocess sensor data and identify anomalies but has issues with handling missing values, calculating rolling average temperature, and identifying anomalies using statistical thresholds.

5 - Answer:
The corrected code should handle missing values properly, calculate the rolling average temperature accurately, and identify anomalies based on appropriate statistical thresholds.
```python
import pandas as pd

# Load sensor data
df = pd.read_csv('sensor_data.csv')

# Fill missing values with the mean temperature
df['Temperature'].fillna(df['Temperature'].mean(), inplace=True)

# Convert 'Timestamp' column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Sort DataFrame by timestamp
df.sort_values(by='Timestamp', inplace=True)

# Calculate rolling average temperature for a 10-minute window
df['Rolling_Avg_Temperature'] = df['Temperature'].rolling(window='10T', min_periods=1).mean()

# Identify anomalies in temperature
df['Anomaly'] = df['Temperature'] > (df['Rolling_Avg_Temperature'] + 2 * df['Temperature'].std())

# Save the result to a new CSV file
df.to_csv('processed_sensor_data.csv', index=False)
```
In the corrected code, we fill missing values with the mean temperature to handle missing data. We sort the DataFrame by timestamp to ensure the rolling average calculation is performed correctly. We use `min_periods=1` to specify the minimum number of periods required to compute the rolling average. Additionally, we identify anomalies based on appropriate statistical thresholds by using the rolling average temperature and the standard deviation of temperature readings.


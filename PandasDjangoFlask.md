Pandas
GPT Link  
https://chatgpt.com/share/29ef99ca-66db-417e-a9c1-2ab03205b348
Part 1 - Questions (gpt 4)
Question 1

Absolutely, let's make the debugging questions more advanced by incorporating concepts like data cleaning, handling missing values, and optimizing performance.

0 - Real-life Application of Pandas: Customer Data Analysis

1 - Scenario: 
You are working on a project where you need to analyze customer data from an e-commerce platform. Your task involves cleaning the data, handling missing values, and performing advanced analysis to identify customer trends and behavior.

2 - Buggy Code:
```python
import pandas as pd

# Load customer data
df = pd.read_csv('customer_data.csv')

# Remove rows with missing values
df_cleaned = df.dropna()

# Convert 'Registration Date' column to datetime
df_cleaned['Registration Date'] = pd.to_datetime(df_cleaned['Registration Date'])

# Extract year from 'Registration Date' column
df_cleaned['Registration Year'] = df_cleaned['Registration Date'].dt.year

# Calculate the number of new registrations per year
new_registrations_per_year = df_cleaned.groupby('Registration Year').count()

# Save the result to a new CSV file
new_registrations_per_year.to_csv('new_registrations_per_year.csv')
```

3 - Question: 
Explain what issue you encounter in the code.

4 - Explanation: 
The code attempts to analyze new registrations per year but misses handling missing values properly and does not optimize the aggregation process for performance.

5 - Answer: 
The corrected code should handle missing values, optimize the aggregation process, and use a more appropriate method for counting new registrations per year.
```python
import pandas as pd

# Load customer data
df = pd.read_csv('customer_data.csv')

# Drop rows with missing values in the 'Registration Date' column
df_cleaned = df.dropna(subset=['Registration Date'])

# Convert 'Registration Date' column to datetime
df_cleaned['Registration Date'] = pd.to_datetime(df_cleaned['Registration Date'])

# Extract year from 'Registration Date' column
df_cleaned['Registration Year'] = df_cleaned['Registration Date'].dt.year

# Count new registrations per year
new_registrations_per_year = df_cleaned.groupby('Registration Year').size().reset_index(name='New Registrations')

# Save the result to a new CSV file
new_registrations_per_year.to_csv('new_registrations_per_year.csv', index=False)
```
In the corrected code, we handle missing values by dropping rows with missing registration dates. We then use the `size` method to count the number of new registrations per year, which is a more efficient approach. Additionally, we reset the index and specify `index=False` while saving the result to a CSV file.

Question 2

Certainly! Here's another scenario that tests advanced concepts in Pandas:

0 - Real-life Application of Pandas: Web Traffic Analysis

1 - Scenario: 
You are working on a project where you need to analyze web traffic data from a popular website. Your task involves cleaning and preprocessing the data, identifying patterns in user behavior, and generating insights to optimize website performance.

2 - Buggy Code:
```python
import pandas as pd

# Load web traffic data
df = pd.read_csv('web_traffic_data.csv')

# Convert 'Timestamp' column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Remove duplicate entries
df.drop_duplicates()

# Calculate total page views per day
daily_page_views = df.groupby(df['Timestamp'].dt.date)['Page Views'].sum()

# Calculate average time spent on the website per day
df['Time Spent'] = pd.to_timedelta(df['Time Spent'])
average_time_spent = df.groupby(df['Timestamp'].dt.date)['Time Spent'].mean()

# Merge the two DataFrames
daily_stats = pd.concat([daily_page_views, average_time_spent], axis=1, keys=['Page Views', 'Average Time Spent'])

# Save the result to a new CSV file
daily_stats.to_csv('daily_stats.csv')
```

3 - Question: 
Explain what issue you encounter in the code.

4 - Explanation: 
The code attempts to analyze web traffic data but has issues with removing duplicates, calculating total page views, and computing the average time spent on the website per day.

5 - Answer: 
The corrected code should properly handle duplicate entries, optimize the aggregation process for performance, and compute the average time spent on the website per day accurately.
```python
import pandas as pd

# Load web traffic data
df = pd.read_csv('web_traffic_data.csv')

# Convert 'Timestamp' column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Remove duplicate entries
df.drop_duplicates(inplace=True)

# Calculate total page views per day
daily_page_views = df.groupby(df['Timestamp'].dt.date)['Page Views'].sum()

# Calculate average time spent on the website per day
df['Time Spent'] = pd.to_timedelta(df['Time Spent'])
average_time_spent = df.groupby(df['Timestamp'].dt.date)['Time Spent'].sum() / df.groupby(df['Timestamp'].dt.date)['Page Views'].count()

# Merge the two DataFrames
daily_stats = pd.concat([daily_page_views, average_time_spent], axis=1, keys=['Page Views', 'Average Time Spent'])

# Save the result to a new CSV file
daily_stats.to_csv('daily_stats.csv')
```
In the corrected code, we handle duplicate entries by using `inplace=True` in the `drop_duplicates` method. We accurately compute the average time spent on the website per day by dividing the total time spent by the number of page views. Additionally, we use the `sum()` function to aggregate time spent on the website per day.

Question 3

Certainly! Here's another scenario that tests advanced concepts in Pandas:

0 - Real-life Application of Pandas: Market Basket Analysis

1 - Scenario: 
You are working on a project where you need to analyze transaction data from a retail store to perform market basket analysis. Your task involves preprocessing the data, identifying frequent itemsets, and generating association rules to understand purchasing patterns.

2 - Buggy Code:
```python
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# Load transaction data
df = pd.read_csv('transaction_data.csv')

# Convert data to transaction format
transactions = df.groupby('TransactionID')['Item'].apply(list)

# One-hot encode the transaction data
one_hot_encoded = pd.get_dummies(transactions.apply(pd.Series).stack()).sum(level=0)

# Find frequent itemsets using Apriori algorithm
frequent_itemsets = apriori(one_hot_encoded, min_support=0.1, use_colnames=True)

# Generate association rules
rules = association_rules(frequent_itemsets, metric='lift', min_threshold=1.0)

# Save the association rules to a new CSV file
rules.to_csv('association_rules.csv')
```

3 - Question: 
Explain what issue you encounter in the code.

4 - Explanation: 
The code attempts to perform market basket analysis but has issues with preprocessing the transaction data, one-hot encoding, and generating association rules.

5 - Answer: 
The corrected code should properly preprocess the transaction data, perform one-hot encoding, and generate association rules accurately.
```python
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# Load transaction data
df = pd.read_csv('transaction_data.csv')

# Convert data to transaction format
transactions = df.groupby('TransactionID')['Item'].apply(list)

# Create a list of unique items
items = list(set(df['Item']))

# Create an empty DataFrame to store one-hot encoded transaction data
one_hot_encoded = pd.DataFrame(0, index=transactions.index, columns=items)

# Update the one-hot encoded DataFrame based on transactions
for index, transaction in transactions.iteritems():
    one_hot_encoded.loc[index, transaction] = 1

# Find frequent itemsets using Apriori algorithm
frequent_itemsets = apriori(one_hot_encoded, min_support=0.1, use_colnames=True)

# Generate association rules
rules = association_rules(frequent_itemsets, metric='lift', min_threshold=1.0)

# Save the association rules to a new CSV file
rules.to_csv('association_rules.csv', index=False)
```
In the corrected code, we properly preprocess the transaction data and create an empty DataFrame to store one-hot encoded transaction data. We then update the one-hot encoded DataFrame based on transactions and generate association rules accurately. Additionally, we specify `index=False` while saving the association rules to a CSV file.

Question 4

Certainly! Here's another scenario that tests advanced concepts in Pandas:

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

Question 5

Certainly! Here's another scenario that tests advanced concepts in Pandas:

0 - Real-life Application of Pandas: Social Media Engagement Analysis

1 - Scenario:
You are working on a project where you need to analyze engagement metrics from social media posts to understand user interaction and optimize content strategy. Your task involves preprocessing the data, calculating engagement rates, and identifying trends in user engagement.

2 - Buggy Code:
```python
import pandas as pd

# Load social media data
df = pd.read_csv('social_media_data.csv')

# Convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Calculate engagement rate
df['Engagement Rate'] = df['Likes'] / df['Impressions'] * 100

# Group by month and calculate average engagement rate
monthly_engagement = df.groupby(df['Date'].dt.month)['Engagement Rate'].mean()

# Save the result to a new CSV file
monthly_engagement.to_csv('monthly_engagement.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to analyze social media engagement but has issues with aggregating data by month and calculating the average engagement rate.

5 - Answer:
The corrected code should properly aggregate the data by month and calculate the average engagement rate accurately.
```python
import pandas as pd

# Load social media data
df = pd.read_csv('social_media_data.csv')

# Convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Calculate engagement rate
df['Engagement Rate'] = df['Likes'] / df['Impressions'] * 100

# Group by month and calculate average engagement rate
monthly_engagement = df.groupby(df['Date'].dt.month)['Engagement Rate'].mean()

# Convert the result to DataFrame
monthly_engagement_df = monthly_engagement.reset_index(name='Average Engagement Rate')

# Save the result to a new CSV file
monthly_engagement_df.to_csv('monthly_engagement.csv', index=False)
```
In the corrected code, we properly aggregate the data by month using `groupby` and calculate the average engagement rate. We reset the index and specify `index=False` while saving the result to a CSV file to avoid saving the index column.

Question 6

Certainly! Here's another scenario that tests advanced concepts in Pandas:

0 - Real-life Application of Pandas: Customer Churn Prediction

1 - Scenario:
You are working on a project where you need to analyze customer data to predict churn for a subscription-based service. Your task involves preprocessing the data, feature engineering, building a predictive model, and evaluating model performance.

2 - Buggy Code:
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load customer data
df = pd.read_csv('customer_data.csv')

# Drop rows with missing values
df.dropna(inplace=True)

# Convert categorical variables to dummy variables
df = pd.get_dummies(df, columns=['Gender', 'Subscription Plan'], drop_first=True)

# Split the data into features and target variable
X = df.drop('Churn', axis=1)
y = df['Churn']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train a random forest classifier
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to predict customer churn using a random forest classifier but has issues with handling categorical variables, splitting the data, and evaluating model performance.

5 - Answer:
The corrected code should properly encode categorical variables, split the data into training and test sets, and evaluate model performance using appropriate metrics.
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load customer data
df = pd.read_csv('customer_data.csv')

# Drop rows with missing values
df.dropna(inplace=True)

# Convert categorical variables to dummy variables
df = pd.get_dummies(df, columns=['Gender', 'Subscription Plan'], drop_first=True)

# Split the data into features and target variable
X = df.drop('Churn', axis=1)
y = df['Churn']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train a random forest classifier
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
```
In the corrected code, we properly encode categorical variables using one-hot encoding to ensure compatibility with the random forest classifier. We split the data into training and test sets using `train_test_split` and evaluate model performance using accuracy as a metric.

Question 7

Got it! Let's focus on bugs that are solely based on Pandas concepts:

0 - Real-life Application of Pandas: Retail Sales Analysis

1 - Scenario:
You are analyzing retail sales data to identify trends and patterns in customer purchasing behavior. Your task involves preprocessing the data, aggregating sales by different categories, and generating insights for business decisions.

2 - Buggy Code:
```python
import pandas as pd

# Load sales data
df = pd.read_csv('sales_data.csv')

# Convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Filter data for the current year
df_current_year = df[df['Date'].dt.year == 2023]

# Group by month and calculate total sales
monthly_sales = df_current_year.groupby(df_current_year['Date'].dt.month)['Sales'].sum()

# Save the result to a new CSV file
monthly_sales.to_csv('monthly_sales.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to aggregate monthly sales for the current year but does not handle missing months properly, leading to incomplete or incorrect results.

5 - Answer:
The corrected code should ensure that all months are included in the aggregation, even if there are no sales recorded for some months.
```python
import pandas as pd

# Load sales data
df = pd.read_csv('sales_data.csv')

# Convert 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Filter data for the current year
df_current_year = df[df['Date'].dt.year == 2023]

# Group by month and calculate total sales
monthly_sales = df_current_year.groupby(df_current_year['Date'].dt.month)['Sales'].sum()

# Reindex to include all months
monthly_sales = monthly_sales.reindex(range(1, 13), fill_value=0)

# Save the result to a new CSV file
monthly_sales.to_csv('monthly_sales.csv')
```
In the corrected code, after aggregating monthly sales, we reindex the result to include all months from January to December using `reindex` and fill any missing months with 0 sales using `fill_value=0`. This ensures that the output includes sales data for all months of the year.

Question 8

Certainly! Here's another scenario that tests advanced Pandas concepts:

0 - Real-life Application of Pandas: Employee Performance Analysis

1 - Scenario:
You are working on a project where you need to analyze employee performance data to evaluate productivity and identify high performers. Your task involves data cleaning, aggregating performance metrics, and generating insights for management.

2 - Buggy Code:
```python
import pandas as pd

# Load employee performance data
df = pd.read_csv('employee_performance.csv')

# Fill missing values in the 'Performance Score' column with the mean
df['Performance Score'].fillna(df['Performance Score'].mean(), inplace=True)

# Convert 'Review Date' column to datetime
df['Review Date'] = pd.to_datetime(df['Review Date'])

# Extract the year and month from 'Review Date'
df['Year'] = df['Review Date'].dt.year
df['Month'] = df['Review Date'].dt.month

# Group by employee and calculate the average performance score per month
monthly_performance = df.groupby(['Employee ID', 'Year', 'Month'])['Performance Score'].mean()

# Pivot the table to have employees as rows and months as columns
pivot_table = monthly_performance.pivot(index='Employee ID', columns=['Year', 'Month'], values='Performance Score')

# Save the result to a new CSV file
pivot_table.to_csv('monthly_performance.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to pivot the table to have employees as rows and months as columns, but it misses correctly resetting the index and properly handling the multi-index resulting from the `groupby` operation.

5 - Answer:
The corrected code should properly reset the index after the groupby operation and handle the multi-index appropriately before pivoting the table.
```python
import pandas as pd

# Load employee performance data
df = pd.read_csv('employee_performance.csv')

# Fill missing values in the 'Performance Score' column with the mean
df['Performance Score'].fillna(df['Performance Score'].mean(), inplace=True)

# Convert 'Review Date' column to datetime
df['Review Date'] = pd.to_datetime(df['Review Date'])

# Extract the year and month from 'Review Date'
df['Year'] = df['Review Date'].dt.year
df['Month'] = df['Review Date'].dt.month

# Group by employee and calculate the average performance score per month
monthly_performance = df.groupby(['Employee ID', 'Year', 'Month'])['Performance Score'].mean().reset_index()

# Pivot the table to have employees as rows and months as columns
pivot_table = monthly_performance.pivot_table(index='Employee ID', columns=['Year', 'Month'], values='Performance Score')

# Save the result to a new CSV file
pivot_table.to_csv('monthly_performance.csv')
```
In the corrected code, after grouping by employee and calculating the average performance score per month, we use `reset_index()` to flatten the multi-index. This ensures that the `pivot_table` method works correctly by properly restructuring the DataFrame into the desired format with employees as rows and months as columns.

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

Question 12

Certainly! Here’s another scenario that tests advanced Pandas concepts such as handling categorical data, merging datasets with different shapes, and using advanced grouping operations:

0 - Real-life Application of Pandas: Marketing Campaign Analysis

1 - Scenario:
You are analyzing the effectiveness of a marketing campaign across different regions and customer segments. Your task involves cleaning the data, merging customer and campaign datasets, handling categorical data, and generating detailed performance reports.

2 - Buggy Code:
```python
import pandas as pd

# Load customer data
df_customers = pd.read_csv('customers.csv')

# Load campaign data
df_campaign = pd.read_csv('campaign.csv')

# Convert 'Date' column to datetime in both dataframes
df_customers['Date'] = pd.to_datetime(df_customers['Date'])
df_campaign['Date'] = pd.to_datetime(df_campaign['Date'])

# Merge the dataframes on 'Customer ID'
df_merged = pd.merge(df_customers, df_campaign, on='Customer ID')

# Fill missing values with the mode for categorical columns
df_merged['Region'].fillna(df_merged['Region'].mode()[0], inplace=True)
df_merged['Segment'].fillna(df_merged['Segment'].mode()[0], inplace=True)

# Group by 'Region' and 'Segment' to calculate total sales and count of customers
region_segment_summary = df_merged.groupby(['Region', 'Segment'])['Sales'].sum()
customer_count = df_merged.groupby(['Region', 'Segment'])['Customer ID'].count()

# Merge the summary dataframes
summary = pd.concat([region_segment_summary, customer_count], axis=1, keys=['Total Sales', 'Customer Count'])

# Save the result to a new CSV file
summary.to_csv('campaign_summary.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to merge customer and campaign data, handle missing categorical data, and generate a summary report. However, it has issues with correctly merging the dataframes, handling missing values, and properly aligning the groupby results for concatenation.

5 - Answer:
The corrected code should handle merging the dataframes correctly, appropriately fill missing values, and align the groupby results for concatenation.
```python
import pandas as pd

# Load customer data
df_customers = pd.read_csv('customers.csv')

# Load campaign data
df_campaign = pd.read_csv('campaign.csv')

# Convert 'Date' column to datetime in both dataframes
df_customers['Date'] = pd.to_datetime(df_customers['Date'])
df_campaign['Date'] = pd.to_datetime(df_campaign['Date'])

# Merge the dataframes on 'Customer ID'
df_merged = pd.merge(df_customers, df_campaign, on='Customer ID', how='left')

# Fill missing values with the mode for categorical columns
for col in ['Region', 'Segment']:
    df_merged[col].fillna(df_merged[col].mode()[0], inplace=True)

# Group by 'Region' and 'Segment' to calculate total sales and count of customers
region_segment_summary = df_merged.groupby(['Region', 'Segment'])['Sales'].sum().reset_index()
customer_count = df_merged.groupby(['Region', 'Segment'])['Customer ID'].count().reset_index()

# Merge the summary dataframes
summary = pd.merge(region_segment_summary, customer_count, on=['Region', 'Segment'])
summary.rename(columns={'Customer ID': 'Customer Count'}, inplace=True)

# Save the result to a new CSV file
summary.to_csv('campaign_summary.csv', index=False)
```
In the corrected code, we:
- Merge the dataframes using `how='left'` to ensure that all customers are included, even if they didn't participate in the campaign.
- Use a loop to fill missing values for the categorical columns 'Region' and 'Segment' with the mode of each column.
- Reset the index after grouping by 'Region' and 'Segment' to ensure that the dataframes are properly aligned.
- Merge the summary dataframes on 'Region' and 'Segment', and rename the 'Customer ID' column to 'Customer Count'.

This ensures that the data is merged, cleaned, and summarized correctly, providing an accurate analysis of the marketing campaign's effectiveness across different regions and customer segments.

Question 13

Sure! Let's focus on a different set of advanced Pandas concepts such as handling hierarchical indexing, reshaping data with `stack` and `unstack`, and performing advanced filtering operations.

0 - Real-life Application of Pandas: Employee Performance and Compensation Analysis

1 - Scenario:
You are working on a project where you need to analyze employee performance and compensation data across different departments and roles within a company. Your task involves cleaning the data, handling hierarchical indexing, reshaping the data, and performing complex filtering operations to generate detailed performance and compensation reports.

2 - Buggy Code:
```python
import pandas as pd

# Load performance data
df_performance = pd.read_csv('performance_data.csv')

# Load compensation data
df_compensation = pd.read_csv('compensation_data.csv')

# Convert 'Review Date' and 'Pay Date' columns to datetime
df_performance['Review Date'] = pd.to_datetime(df_performance['Review Date'])
df_compensation['Pay Date'] = pd.to_datetime(df_compensation['Pay Date'])

# Merge the dataframes on 'Employee ID'
df_merged = pd.merge(df_performance, df_compensation, on='Employee ID')

# Set multi-level index with 'Department' and 'Role'
df_merged.set_index(['Department', 'Role'], inplace=True)

# Calculate the average performance score and total compensation by department and role
performance_summary = df_merged.groupby(['Department', 'Role'])['Performance Score'].mean()
compensation_summary = df_merged.groupby(['Department', 'Role'])['Compensation'].sum()

# Combine the summaries into a single DataFrame
summary = pd.concat([performance_summary, compensation_summary], axis=1, keys=['Avg Performance Score', 'Total Compensation'])

# Filter to get the top-performing roles in each department
top_performers = summary[summary['Avg Performance Score'] > summary['Avg Performance Score'].quantile(0.75)]

# Save the result to a new CSV file
top_performers.to_csv('top_performers.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to merge employee performance and compensation data, handle hierarchical indexing, and perform complex filtering operations. However, it has issues with properly merging the data, handling hierarchical indexing, and correctly filtering and reshaping the data.

5 - Answer:
The corrected code should properly merge the data, handle hierarchical indexing, and correctly filter and reshape the data.
```python
import pandas as pd

# Load performance data
df_performance = pd.read_csv('performance_data.csv')

# Load compensation data
df_compensation = pd.read_csv('compensation_data.csv')

# Convert 'Review Date' and 'Pay Date' columns to datetime
df_performance['Review Date'] = pd.to_datetime(df_performance['Review Date'])
df_compensation['Pay Date'] = pd.to_datetime(df_compensation['Pay Date'])

# Merge the dataframes on 'Employee ID'
df_merged = pd.merge(df_performance, df_compensation, on='Employee ID', how='outer')

# Set multi-level index with 'Department', 'Role', and 'Employee ID'
df_merged.set_index(['Department', 'Role', 'Employee ID'], inplace=True)

# Calculate the average performance score and total compensation by department and role
performance_summary = df_merged.groupby(level=['Department', 'Role'])['Performance Score'].mean().unstack()
compensation_summary = df_merged.groupby(level=['Department', 'Role'])['Compensation'].sum().unstack()

# Combine the summaries into a single DataFrame
summary = pd.concat([performance_summary, compensation_summary], axis=1, keys=['Avg Performance Score', 'Total Compensation'])

# Filter to get the top-performing roles in each department
summary_stack = summary.stack(level=0)  # Reshape for easier filtering
top_performers = summary_stack[summary_stack['Avg Performance Score'] > summary_stack['Avg Performance Score'].groupby(level=0).transform('quantile', 0.75)]

# Save the result to a new CSV file
top_performers.to_csv('top_performers.csv')
```
In the corrected code, we:
- Use `how='outer'` during merging to include all records.
- Set a multi-level index including 'Employee ID' for accurate grouping.
- Use `unstack` to reshape the data after grouping.
- Combine the summaries with `pd.concat`.
- Reshape the combined summary with `stack` for easier filtering.
- Apply the filter to get the top-performing roles based on the 75th percentile within each department.

This ensures accurate merging, proper hierarchical indexing, and correct filtering and reshaping for detailed performance and compensation analysis.

Question 14

Sure! Let's focus on a scenario that tests advanced Pandas concepts such as time series resampling, handling missing data, and using advanced aggregation and filtering operations.

0 - Real-life Application of Pandas: Environmental Data Analysis

1 - Scenario:
You are analyzing environmental data collected from various sensors measuring temperature, humidity, and air quality over time. Your task involves cleaning the data, resampling the time series data to a daily frequency, handling missing values, and performing advanced aggregations to generate summary statistics.

2 - Buggy Code:
```python
import pandas as pd

# Load sensor data
df = pd.read_csv('environmental_data.csv')

# Convert 'Timestamp' column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Set 'Timestamp' as the index
df.set_index('Timestamp', inplace=True)

# Resample data to daily frequency
df_daily = df.resample('D').mean()

# Fill missing values with the mean of the column
df_daily.fillna(df.mean(), inplace=True)

# Calculate daily summary statistics
summary = df_daily.groupby(df_daily.index)['Temperature', 'Humidity', 'Air Quality'].agg(['mean', 'max', 'min'])

# Filter to get days with extreme temperature variations
extreme_days = summary[(summary['Temperature']['max'] - summary['Temperature']['min']) > 10]

# Save the result to a new CSV file
extreme_days.to_csv('extreme_days.csv')
```

3 - Question:
Explain what issue you encounter in the code.

4 - Explanation:
The code attempts to resample environmental data to a daily frequency, handle missing values, and perform advanced aggregations. However, it has issues with handling missing values properly, correctly applying groupby operations, and properly filtering the results.

5 - Answer:
The corrected code should properly handle missing values, correctly apply aggregation operations, and filter the results accurately.
```python
import pandas as pd

# Load sensor data
df = pd.read_csv('environmental_data.csv')

# Convert 'Timestamp' column to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Set 'Timestamp' as the index
df.set_index('Timestamp', inplace=True)

# Resample data to daily frequency
df_daily = df.resample('D').mean()

# Fill missing values with the mean of the column
df_daily.fillna(df_daily.mean(), inplace=True)

# Calculate daily summary statistics
summary = df_daily.agg({'Temperature': ['mean', 'max', 'min'], 
                        'Humidity': ['mean', 'max', 'min'], 
                        'Air Quality': ['mean', 'max', 'min']})

# Filter to get days with extreme temperature variations
extreme_days = df_daily[(df_daily['Temperature'].max() - df_daily['Temperature'].min()) > 10]

# Save the result to a new CSV file
extreme_days.to_csv('extreme_days.csv')
```
In the corrected code, we:
- Fill missing values with the mean of each column after resampling (`df_daily.mean()`).
- Use `agg` to calculate daily summary statistics for temperature, humidity, and air quality.
- Correctly filter the days with extreme temperature variations by applying the condition on the resampled daily data (`df_daily`) instead of the summary statistics.

This ensures that the data is resampled, cleaned, and summarized accurately, providing useful insights into environmental conditions and identifying days with extreme variations.






Django 
GPT Link 
 https://chatgpt.com/share/9edfd86d-4b9d-4fc4-951c-dc56d3ed2013
Part 1 - Questions (gpt4)

Question 1

0 - Topics
- Django ORM (Object-Relational Mapping)
- Query Optimization
- Transactions and Atomic Operations
- Custom Model Methods

1 - Scenario
A company uses a Django application to manage orders and their corresponding invoices. Each time an order is placed, an invoice should be created and linked to the order. The developer wrote a method to handle this process, but it seems that sometimes invoices are not being created, causing inconsistencies.

2 - Code
```python
from django.db import models, transaction

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

class Invoice(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField(auto_now_add=True)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)

class OrderService:
    def create_order_with_invoice(self, customer_name, amount):
        order = Order(customer_name=customer_name, total_amount=amount)
        order.save()
        self.create_invoice(order)
    
    def create_invoice(self, order):
        invoice = Invoice(order=order, amount_due=order.total_amount)
        invoice.save()

# Using the service
service = OrderService()
service.create_order_with_invoice("John Doe", 150.00)
```

3 - Question
There seems to be an issue where invoices are not always created when an order is placed. Identify and explain the issue in the code.

4 - Explanation
The code does not handle potential errors that might occur when saving the order or creating the invoice. If an error occurs after the order is saved but before the invoice is saved, the order will exist without an associated invoice, causing data inconsistencies. This can happen if there is a database issue or some other unexpected exception.

5 - Answer
```python
from django.db import models, transaction

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

class Invoice(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField(auto_now_add=True)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)

class OrderService:
    def create_order_with_invoice(self, customer_name, amount):
        try:
            with transaction.atomic():
                order = Order(customer_name=customer_name, total_amount=amount)
                order.save()
                self.create_invoice(order)
        except Exception as e:
            # Handle exception or log error
            print(f"Error occurred: {e}")
    
    def create_invoice(self, order):
        invoice = Invoice(order=order, amount_due=order.total_amount)
        invoice.save()

# Using the service
service = OrderService()
service.create_order_with_invoice("John Doe", 150.00)
```

Question 2

0 - Topics
- Custom Manager Methods
- QuerySets and Lazy Evaluation
- Aggregation
- Handling Large Querysets

1 - Scenario
A blog application needs to display the top 5 most commented posts. The developer has written a custom manager method to achieve this. However, the page displaying the top posts is very slow, indicating there might be inefficiencies in the code.

2 - Code
```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

class PostManager(models.Manager):
    def top_commented_posts(self):
        posts = self.get_queryset()
        posts_with_comment_count = [(post, post.comments.count()) for post in posts]
        sorted_posts = sorted(posts_with_comment_count, key=lambda x: x[1], reverse=True)
        return [post for post, count in sorted_posts[:5]]

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    objects = PostManager()

# Using the custom manager
top_posts = Post.objects.top_commented_posts()
```

3 - Question
The page that displays the top 5 most commented posts is very slow. Identify and explain the inefficiency in the code.

4 - Explanation
The code retrieves all posts and then manually counts the comments for each post in Python, which results in multiple database queries (one for each post). This is highly inefficient, especially with a large number of posts, causing significant performance degradation.

5 - Answer
```python
from django.db import models
from django.db.models import Count

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

class PostManager(models.Manager):
    def top_commented_posts(self):
        return self.get_queryset().annotate(comment_count=Count('comments')).order_by('-comment_count')[:5]

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    objects = PostManager()

# Using the custom manager
top_posts = Post.objects.top_commented_posts()
```

Question 3

0 - Topics
- Custom Model Methods
- Signals and Side Effects
- Data Integrity
- Concurrency Issues

1 - Scenario
An e-commerce application has a Product model with a method to decrease the stock quantity when an order is placed. A signal is used to call this method after an Order object is created. However, sometimes the stock quantity does not decrease correctly, especially under high load.

2 - Code
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Product(models.Model):
    name = models.CharField(max_length=100)
    stock = models.IntegerField()

    def decrease_stock(self, quantity):
        self.stock -= quantity
        self.save()

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=Order)
def decrease_product_stock(sender, instance, **kwargs):
    instance.product.decrease_stock(instance.quantity)

# Creating an order
product = Product.objects.create(name="Laptop", stock=10)
order = Order.objects.create(product=product, quantity=1)
```

3 - Question
Under high load, the stock quantity of products is not always updated correctly. Identify and explain the concurrency issue in the code.

4 - Explanation
The code does not handle concurrent updates to the product stock properly. When multiple orders are placed simultaneously, race conditions can occur, causing the stock quantity to be updated incorrectly. This happens because the `decrease_stock` method reads and writes the stock without any locking mechanism to ensure atomicity.

5 - Answer
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction

class Product(models.Model):
    name = models.CharField(max_length=100)
    stock = models.IntegerField()

    def decrease_stock(self, quantity):
        with transaction.atomic():
            self.refresh_from_db()
            self.stock -= quantity
            self.save()

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=Order)
def decrease_product_stock(sender, instance, **kwargs):
    instance.product.decrease_stock(instance.quantity)

# Creating an order
product = Product.objects.create(name="Laptop", stock=10)
order = Order.objects.create(product=product, quantity=1)
```

Question 4

0 - Topics
- Signal Handling
- Data Integrity
- Avoiding Circular Imports
- Best Practices in Signal Usage

1 - Scenario
A notification system in a Django application sends an email to the user each time their profile is updated. The developer implemented a signal to handle this. However, there are cases where users report receiving multiple emails for a single update.

2 - Code
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()

@receiver(post_save, sender=UserProfile)
def send_profile_update_email(sender, instance, **kwargs):
    send_mail(
        'Profile Updated',
        'Your profile has been updated.',
        'from@example.com',
        [instance.user.email],
        fail_silently=False,
    )

# Updating user profile
user_profile = UserProfile.objects.get(user_id=1)
user_profile.bio = "New bio"
user_profile.save()
```

3 - Question
Users are receiving multiple emails for a single profile update. Identify and explain the issue in the code.

4 - Explanation
The signal is connected in such a way that it triggers on every save

 operation of the UserProfile model, including any internal or secondary saves that may occur within other signals or save operations, leading to multiple emails being sent for a single logical update.

5 - Answer
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()

@receiver(post_save, sender=UserProfile)
def send_profile_update_email(sender, instance, created, **kwargs):
    if not created:
        send_mail(
            'Profile Updated',
            'Your profile has been updated.',
            'from@example.com',
            [instance.user.email],
            fail_silently=False,
        )

# Updating user profile
user_profile = UserProfile.objects.get(user_id=1)
user_profile.bio = "New bio"
user_profile.save()
```
In this corrected version, the signal handler checks if the instance is newly created or updated. The email is sent only if the instance is updated (not newly created), avoiding multiple emails for a single update.
Question 5

0 - Topics
- Django Forms and Form Validation
- Custom Validators
- Handling File Uploads

1 - Scenario
An application allows users to upload their profile pictures. The developer has implemented a custom form to handle the upload and added a custom validator to ensure the uploaded file is an image. However, users are reporting that non-image files are being accepted.

2 - Code
```python
from django import forms
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions
from django.core.files.uploadedfile import UploadedFile
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pics/')

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

    def clean_profile_picture(self):
        file = self.cleaned_data.get('profile_picture')
        if file:
            if not self.is_image(file):
                raise ValidationError("Uploaded file is not an image.")
        return file

    def is_image(self, file: UploadedFile):
        try:
            get_image_dimensions(file)
            return True
        except Exception:
            return False

# Handling the form in a view
def upload_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    else:
        form = ProfilePictureForm()
    return render(request, 'upload.html', {'form': form})
```

3 - Question
Non-image files are being accepted as valid profile pictures. Identify and explain the issue in the code.

4 - Explanation
The `get_image_dimensions` function only checks the dimensions of the image but does not validate if the file is an image itself. If the file isn't an image, `get_image_dimensions` might still return dimensions without raising an exception, leading to incorrect validation results.

5 - Answer
```python
from django import forms
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions
from django.core.files.uploadedfile import UploadedFile
from django.db import models
from PIL import Image

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pics/')

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

    def clean_profile_picture(self):
        file = self.cleaned_data.get('profile_picture')
        if file:
            if not self.is_image(file):
                raise ValidationError("Uploaded file is not an image.")
        return file

    def is_image(self, file: UploadedFile):
        try:
            # Open the file to verify it's an image
            Image.open(file).verify()
            return True
        except Exception:
            return False

# Handling the form in a view
def upload_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    else:
        form = ProfilePictureForm()
    return render(request, 'upload.html', {'form': form})
```

Question 6

0 - Topics
- Django Middleware
- Request/Response Processing
- Error Handling and Logging

1 - Scenario
A company uses custom middleware to log every request and response. They noticed that some requests and responses are not being logged, especially those that result in an error. The developer needs to ensure all requests and responses, including those leading to errors, are logged.

2 - Code
```python
import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logger.info(f"Request: {request.method} {request.get_full_path()}")

    def process_response(self, request, response):
        logger.info(f"Response: {response.status_code}")
        return response

# Add middleware in settings
MIDDLEWARE = [
    # Other middlewares
    'myapp.middleware.LoggingMiddleware',
]

# settings.py for logger configuration
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
```

3 - Question
Some requests and responses, particularly those resulting in errors, are not being logged. Identify and explain the issue in the code.

4 - Explanation
The current implementation only logs successful responses. If an error occurs during request processing, the `process_response` method is not called, resulting in missed logs for those requests.

5 - Answer
```python
import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logger.info(f"Request: {request.method} {request.get_full_path()}")

    def process_response(self, request, response):
        logger.info(f"Response: {response.status_code}")
        return response

    def process_exception(self, request, exception):
        logger.error(f"Exception: {exception}")
        return None  # Allows other middleware to handle the exception

# Add middleware in settings
MIDDLEWARE = [
    # Other middlewares
    'myapp.middleware.LoggingMiddleware',
]

# settings.py for logger configuration
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
```
In this corrected version, the `process_exception` method is added to the middleware to log exceptions. This ensures that requests resulting in errors are also logged.

Question 7

0 - Topics
- Django Caching
- Template Caching
- Cache Invalidation

1 - Scenario
A news website caches the homepage to improve performance. The homepage shows the latest articles. However, users are reporting that new articles are not appearing on the homepage immediately after being published.

2 - Code
```python
from django.core.cache import cache
from django.shortcuts import render
from myapp.models import Article

def homepage(request):
    cached_homepage = cache.get('homepage')
    if cached_homepage:
        return cached_homepage

    articles = Article.objects.order_by('-published_date')[:10]
    response = render(request, 'homepage.html', {'articles': articles})
    cache.set('homepage', response, 300)  # Cache for 5 minutes
    return response

# Adding a new article
def add_article(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article.objects.create(title=title, content=content)
        cache.delete('homepage')  # Invalidate the homepage cache
        return redirect('homepage')
    return render(request, 'add_article.html')
```

3 - Question
New articles are not appearing on the homepage immediately after being published. Identify and explain the issue in the code.

4 - Explanation
The cache invalidation logic is correct, but there's a potential race condition. If the homepage is accessed frequently, there might be a small window where the cache is deleted but not yet regenerated, causing the old cache to still be served temporarily.

5 - Answer
```python
from django.core.cache import cache
from django.shortcuts import render
from myapp.models import Article

def homepage(request):
    cached_homepage = cache.get('homepage')
    if cached_homepage:
        return cached_homepage

    articles = Article.objects.order_by('-published_date')[:10]
    response = render(request, 'homepage.html', {'articles': articles})
    cache.set('homepage', response, 300)  # Cache for 5 minutes
    return response

# Adding a new article
def add_article(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article.objects.create(title=title, content=content)
        # Double check if cache deletion is necessary before and after article creation
        cache.delete('homepage')  # Invalidate the homepage cache
        return redirect('homepage')
    return render(request, 'add_article.html')
```
In the corrected version, we ensure the cache is deleted before redirecting to the homepage, thus minimizing the window where the old cache might still be served. Additional precautions can be taken if necessary, such as more aggressive invalidation or instant cache regeneration.

Question 8

0 - Topics
- Django Signals
- Data Consistency
- Database Transactions

1 - Scenario
A web application tracks the number of views for each article. The developer implemented a signal to increment the view count every time an article is viewed. However, under heavy traffic, the view counts are inaccurate.

2 - Code
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    view_count = models.PositiveIntegerField(default=0)

class ArticleView(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    view_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=ArticleView)
def increment_view_count(sender, instance, **kwargs):
    article = instance.article
    article.view_count += 1
    article

.save()

# View function to handle article viewing
def view_article(request, article_id):
    article = Article.objects.get(id=article_id)
    ArticleView.objects.create(article=article)
    return render(request, 'article.html', {'article': article})
```

3 - Question
The view counts are inaccurate under heavy traffic. Identify and explain the issue in the code.

4 - Explanation
The issue is due to a race condition where multiple increments to the view count can occur simultaneously, causing some increments to be lost. This happens because each view triggers a separate database save operation without any locking mechanism to ensure atomicity.

5 - Answer
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    view_count = models.PositiveIntegerField(default=0)

class ArticleView(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    view_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=ArticleView)
def increment_view_count(sender, instance, **kwargs):
    with transaction.atomic():
        article = instance.article
        article.view_count = Article.objects.select_for_update().get(id=article.id).view_count + 1
        article.save()

# View function to handle article viewing
def view_article(request, article_id):
    article = Article.objects.get(id=article_id)
    ArticleView.objects.create(article=article)
    return render(request, 'article.html', {'article': article})
```
In this corrected version, the `select_for_update` method is used within a transaction to lock the row and ensure atomicity, preventing race conditions and ensuring accurate view counts under heavy traffic.

These additional debugging questions cover more advanced Django topics, providing challenging scenarios for senior developers to solve.


Question 9

0 - Topics
- Django ORM
- Migrations
- Data Consistency

1 - Scenario
A Django application manages events and attendees. The developer recently added a new field to track the date when an attendee registered for an event. However, after deploying the changes, users are reporting errors when registering for events.

2 - Code
```python
from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=100)
    event_date = models.DateTimeField()

class Attendee(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    registered_date = models.DateTimeField(auto_now_add=True)

# View to handle attendee registration
def register_attendee(request, event_id):
    event = Event.objects.get(id=event_id)
    name = request.POST.get('name')
    email = request.POST.get('email')
    attendee = Attendee(event=event, name=name, email=email)
    attendee.save()
    return render(request, 'registration_success.html', {'attendee': attendee})
```

3 - Question
Users are reporting errors when registering for events after the new field was added. Identify and explain the issue in the code.

4 - Explanation
The issue likely arises from not running the database migrations after adding the new field to the `Attendee` model. This means the database schema is out of sync with the model definition, causing errors when attempting to save new attendees.

5 - Answer
```python
# Running the migrations
$ python manage.py makemigrations
$ python manage.py migrate

# No changes needed in the existing code since the migrations are now in sync
from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=100)
    event_date = models.DateTimeField()

class Attendee(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    registered_date = models.DateTimeField(auto_now_add=True)

# View to handle attendee registration
def register_attendee(request, event_id):
    event = Event.objects.get(id=event_id)
    name = request.POST.get('name')
    email = request.POST.get('email')
    attendee = Attendee(event=event, name=name, email=email)
    attendee.save()
    return render(request, 'registration_success.html', {'attendee': attendee})
```
By ensuring that the database migrations are applied, the new field `registered_date` will be properly added to the database schema, resolving the registration errors.

Question 10

0 - Topics
- Django REST Framework
- Serializer Validation
- API Permissions

1 - Scenario
A Django REST API allows users to create and update profiles. The developer implemented custom validation to ensure that the username is unique. However, users are reporting that they can sometimes create profiles with duplicate usernames.

2 - Code
```python
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from myapp.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'bio']

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

# Registering the viewset in urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UserProfileViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

3 - Question
Users are reporting that they can sometimes create profiles with duplicate usernames. Identify and explain the issue in the code.

4 - Explanation
The issue is due to a race condition where two requests can pass the `validate_username` check simultaneously before either saves the new profile to the database. This allows both requests to create profiles with the same username.

5 - Answer
```python
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from myapp.models import UserProfile
from django.db import IntegrityError

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'bio']

    def create(self, validated_data):
        try:
            return UserProfile.objects.create(**validated_data)
        except IntegrityError:
            raise serializers.ValidationError("Username already exists")

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

# Registering the viewset in urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UserProfileViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```
In this corrected version, the `create` method catches `IntegrityError` exceptions raised by the database if a duplicate username is attempted. This ensures that even concurrent requests cannot create duplicate usernames.

Question 11

0 - Topics
- Asynchronous Views
- Django Channels
- WebSockets

1 - Scenario
A chat application uses Django Channels to handle WebSocket connections for real-time messaging. Users are reporting that messages are sometimes delayed or lost during heavy usage.

2 - Code
```python
# consumers.py
import json
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

# routing.py
from django.urls import path
from myapp.consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/', ChatConsumer.as_asgi()),
]

# settings.py
INSTALLED_APPS = [
    # Other installed apps
    'channels',
]

ASGI_APPLICATION = 'myproject.asgi.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}
```

3 - Question
Users are reporting that messages are sometimes delayed or lost during heavy usage. Identify and explain the issue in the code.

4 - Explanation
The issue is that the application uses an `InMemoryChannelLayer` which is not suitable for production. It does not handle scaling and persistence well, leading to message delays or losses under heavy usage.

5 - Answer
```python
# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

# routing.py
from django.urls import path
from myapp.consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/', ChatConsumer.as_asgi()),
]

# settings.py
INSTALLED_APPS = [
    # Other installed apps
    'channels',
]

ASGI_APPLICATION = 'myproject.asgi.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
```
In this corrected version, `AsyncWebsocketConsumer` is used for handling WebSocket connections asynchronously. The `CHANNEL_LAYERS` setting is updated to use Redis as the backend, which is more suitable for production environments and handles message persistence and scaling much better.

Question 12

0 - Topics
- Django Middleware
- Security
- Cross-Site Request Forgery (CSRF) Protection

1 - Scenario
A Django application uses custom middleware to log user actions. However, users are reporting that certain actions are being rejected with CSRF errors, even though CSRF protection is enabled.

2 - Code
```python
import logging
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import CsrfViewMiddleware

logger = logging.getLogger(__name__)

class ActionLoggingMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            logger.info(f"User {user.username} accessed {request.path}")

# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'myapp.middleware.ActionLoggingMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Sample view
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def protected_view(request):
    if request.method == 'POST':
        # Process the form
        pass
    return render(request, 'protected_view.html')
```

3 - Question
Certain

 actions are being rejected with CSRF errors. Identify and explain the issue in the code.

4 - Explanation
The custom middleware `ActionLoggingMiddleware` is placed after `CsrfViewMiddleware` in the middleware order. If `ActionLoggingMiddleware` modifies the request in any way that affects CSRF token validation, it can cause CSRF errors.

5 - Answer
```python
import logging
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import CsrfViewMiddleware

logger = logging.getLogger(__name__)

class ActionLoggingMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            logger.info(f"User {user.username} accessed {request.path}")

# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'myapp.middleware.ActionLoggingMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Sample view
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def protected_view(request):
    if request.method == 'POST':
        # Process the form
        pass
    return render(request, 'protected_view.html')
```
In the corrected version, the `ActionLoggingMiddleware` is placed before `CsrfViewMiddleware` to ensure that any logging does not interfere with CSRF token validation.

Question 13

0 - Topics
- Django Celery
- Asynchronous Task Queues
- Error Handling in Celery Tasks

1 - Scenario
A Django application uses Celery to handle background tasks such as sending emails. The developer noticed that some tasks fail silently without any indication of an error, causing important emails to be missed.

2 - Code
```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_email_task(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)

# views.py
from myapp.tasks import send_email_task

def send_welcome_email(request):
    send_email_task.delay(
        'Welcome!',
        'Thank you for signing up.',
        'from@example.com',
        [request.user.email]
    )
    return render(request, 'email_sent.html')

# celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
```

3 - Question
Some Celery tasks fail silently without any indication of an error. Identify and explain the issue in the code.

4 - Explanation
The Celery task does not include any error handling or logging, so if an exception occurs (e.g., email sending fails), it fails silently. This makes it difficult to debug and understand why tasks are failing.

5 - Answer
```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True)
def send_email_task(self, subject, message, from_email, recipient_list):
    try:
        send_mail(subject, message, from_email, recipient_list)
    except Exception as exc:
        logger.error(f"Error sending email: {exc}")
        self.retry(exc=exc, countdown=60, max_retries=3)

# views.py
from myapp.tasks import send_email_task

def send_welcome_email(request):
    send_email_task.delay(
        'Welcome!',
        'Thank you for signing up.',
        'from@example.com',
        [request.user.email]
    )
    return render(request, 'email_sent.html')

# celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
```
In the corrected version, error handling and logging are added to the Celery task. If an exception occurs, it is logged, and the task retries up to three times with a delay, providing better error tracking and handling.

Question 14

0 - Topics
- Django Template Tags and Filters
- Custom Template Tags
- Context Processing

1 - Scenario
A Django application uses a custom template tag to display a user's profile information in a sidebar. However, users are reporting that the sidebar sometimes displays incorrect or outdated information.

2 - Code
```python
# templatetags/profile_tags.py
from django import template
from myapp.models import UserProfile

register = template.Library()

@register.simple_tag
def user_profile(user_id):
    try:
        return UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return None

# sidebar.html
{% load profile_tags %}
{% user_profile request.user.id as profile %}
<div class="sidebar">
    <h2>{{ profile.username }}</h2>
    <p>{{ profile.bio }}</p>
</div>

# views.py
from django.shortcuts import render

def dashboard(request):
    return render(request, 'dashboard.html')
```

3 - Question
The sidebar sometimes displays incorrect or outdated information. Identify and explain the issue in the code.

4 - Explanation
The custom template tag `user_profile` fetches the profile using the user ID, but it does not account for any caching or data updates. If the profile data is updated, it might not reflect immediately due to caching or database lag.

5 - Answer
```python
# templatetags/profile_tags.py
from django import template
from myapp.models import UserProfile
from django.core.cache import cache

register = template.Library()

@register.simple_tag
def user_profile(user_id):
    cache_key = f'user_profile_{user_id}'
    profile = cache.get(cache_key)
    if not profile:
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            cache.set(cache_key, profile, 300)  # Cache for 5 minutes
        except UserProfile.DoesNotExist:
            return None
    return profile

# sidebar.html
{% load profile_tags %}
{% user_profile request.user.id as profile %}
<div class="sidebar">
    <h2>{{ profile.username }}</h2>
    <p>{{ profile.bio }}</p>
</div>

# views.py
from django.shortcuts import render

def dashboard(request):
    return render(request, 'dashboard.html')
```
In the corrected version, the custom template tag caches the user profile data to reduce database hits and ensure that changes are reflected after a cache expiry time, improving consistency and performance.

Question 15

0 - Topics
- Django ORM
- Aggregation
- Prefetch Related

1 - Scenario
A blog application shows the number of comments for each post on the homepage. Users report that the homepage loads slowly when there are many posts and comments.

2 - Code
```python
from django.shortcuts import render
from myapp.models import Post, Comment

def homepage(request):
    posts = Post.objects.all()
    post_comments = {post.id: post.comments.count() for post in posts}
    return render(request, 'homepage.html', {'posts': posts, 'post_comments': post_comments})

# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
```

3 - Question
The homepage loads slowly when there are many posts and comments. Identify and explain the issue in the code.

4 - Explanation
The current implementation results in an N+1 query problem. For each post, a separate query is made to count the comments, which is highly inefficient and slows down the page load significantly when there are many posts and comments.

5 - Answer
```python
from django.shortcuts import render
from myapp.models import Post
from django.db.models import Count

def homepage(request):
    posts = Post.objects.annotate(comment_count=Count('comments')).all()
    return render(request, 'homepage.html', {'posts': posts})

# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
```
In the corrected version, the `annotate` method is used to add a `comment_count` attribute to each post in a single query, eliminating the N+1 query problem and significantly improving performance.

These questions test various advanced Django topics and combinations, providing a comprehensive challenge for senior developers.


Flask 
GPT link  
https://chatgpt.com/share/729462e6-a50f-479f-aa2a-5d6226a19ed8
Part 1 - Questions (gpt4)
Question 1

#### 0 - Topics
- Blueprints for Modular Applications
- Application Factories

#### 1 - Scenario
You are working on a large-scale web application and decide to use Flask Blueprints to modularize your application. You also want to implement the application factory pattern to create instances of your app with different configurations.

#### 2 - Code
```python
from flask import Flask, Blueprint, render_template

# Define a blueprint
main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

def create_app():
    app = Flask(__name__)

    # Configuration settings
    app.config['DEBUG'] = True

    # Register blueprint
    app.register_blueprint(main, url_prefix='/main')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()
```

#### 3 - Question
There is an issue with the way the blueprint and the application factory pattern are used in the above code. Identify and explain the issue.

#### 4 - Explanation
The issue is that the template folder is not specified for the Blueprint, and the URL prefix for the Blueprint is set incorrectly. Without specifying the template folder for the Blueprint, Flask won't be able to locate the templates associated with it. Additionally, the URL prefix should typically be more descriptive to avoid conflicts.

#### 5 - Answer
```python
from flask import Flask, Blueprint, render_template

# Define a blueprint with a template folder
main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def index():
    return render_template('index.html')

def create_app():
    app = Flask(__name__)

    # Configuration settings
    app.config['DEBUG'] = True

    # Register blueprint with a proper URL prefix
    app.register_blueprint(main, url_prefix='/main')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()
```

---

Question 2

#### 0 - Topics
- SQLAlchemy for Database Management
- Handling Database Migrations

#### 1 - Scenario
You are developing a web application using Flask with SQLAlchemy for database interactions. You want to ensure the database schema evolves smoothly using Flask-Migrate for migrations.

#### 2 - Code
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
The above code does not handle database migrations properly. Identify and explain the issue in the code.

#### 4 - Explanation
The problem is that the `Migrate` instance is not being properly integrated with Flask-Migrate's CLI commands. This setup will not allow you to run migration commands from the command line.

#### 5 - Answer
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.cli.command()
def deploy():
    """Run deployment tasks."""
    # Run migration scripts
    upgrade()

if __name__ == '__main__':
    app.run()
```

---

Question 3

#### 0 - Topics
- Celery for Asynchronous Tasks
- Redis Queues

#### 1 - Scenario
You are building a web application where some tasks need to be processed asynchronously to avoid blocking the main application thread. You decide to use Celery with Redis as the message broker.

#### 2 - Code
```python
from flask import Flask
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

def make_celery(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    return celery

celery = make_celery(app)

@celery.task
def add_together(a, b):
    return a + b

@app.route('/add/<int:a>/<int:b>')
def add(a, b):
    result = add_together.delay(a, b)
    return f'Task result: {result.get()}'

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
There is an issue with the asynchronous task processing in the above code. Identify and explain the issue.

#### 4 - Explanation
The problem is with the call to `result.get()` inside the route handler. This call will block the main thread until the task completes, defeating the purpose of using Celery for asynchronous task processing.

#### 5 - Answer
```python
from flask import Flask, jsonify
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

def make_celery(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    return celery

celery = make_celery(app)

@celery.task
def add_together(a, b):
    return a + b

@app.route('/add/<int:a>/<int:b>')
def add(a, b):
    result = add_together.delay(a, b)
    return jsonify({'task_id': result.id})

@app.route('/result/<task_id>')
def result(task_id):
    task = add_together.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {'state': task.state, 'status': 'Pending...'}
    elif task.state != 'FAILURE':
        response = {'state': task.state, 'result': task.result}
    else:
        response = {'state': task.state, 'status': str(task.info)}

    return jsonify(response)

if __name__ == '__main__':
    app.run()
```

In this corrected version, the `add` route initiates the task and returns a task ID, while a new `result` route allows clients to check the status of the task asynchronously.

Question 4

#### 0 - Topics
- Handling Large File Uploads
- Streaming Data

#### 1 - Scenario
You are developing a web application that allows users to upload large files. You need to ensure that the server handles the uploads efficiently and without running out of memory.

#### 2 - Code
```python
from flask import Flask, request, Response

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    data = file.read()
    # Simulate processing the data
    process_data(data)
    return 'File uploaded successfully'

def process_data(data):
    # Dummy function to simulate data processing
    pass

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
There are issues with handling large file uploads in the above code. Identify and explain these issues.

#### 4 - Explanation
Reading the entire file into memory at once with `file.read()` can cause the server to run out of memory for large files. Instead, the file should be processed in chunks to handle large uploads efficiently.

#### 5 - Answer
```python
from flask import Flask, request, Response

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    def generate():
        for chunk in iter(lambda: file.read(4096), b''):
            process_data(chunk)
            yield chunk
    return Response(generate(), content_type='text/plain')

def process_data(chunk):
    # Dummy function to simulate data processing
    pass

if __name__ == '__main__':
    app.run()
```

---

Question 5

#### 0 - Topics
- Flask-Security for Role-Based Access Control
- Handling User Authentication and Authorization

#### 1 - Scenario
You are creating a web application that requires user authentication and role-based access control. You decide to use Flask-Security for managing users and roles.

#### 2 - Code
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required, roles_required

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///security.db'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'salty'

db = SQLAlchemy(app)

roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

@app.route('/admin')
@roles_required('admin')
def admin_page():
    return 'Welcome to the admin page!'

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
There is an issue with the role-based access control implementation in the above code. Identify and explain the issue.

#### 4 - Explanation
The code does not initialize the database with the necessary user and role data. Without creating roles and users, the access control checks will fail because no user will have the 'admin' role.

#### 5 - Answer
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required, roles_required
from flask_security.utils import encrypt_password

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///security.db'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'salty'

db = SQLAlchemy(app)

roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

@app.before_first_request
def create_user():
    db.create_all()
    if not user_datastore.find_role('admin'):
        user_datastore.create_role(name='admin')
    if not user_datastore.get_user('admin@example.com'):
        user_datastore.create_user(email='admin@example.com', password=encrypt_password('password'), roles=['admin'])
    db.session.commit()

@app.route('/admin')
@roles_required('admin')
def admin_page():
    return 'Welcome to the admin page!'

if __name__ == '__main__':
    app.run()
```

---

Question 6

#### 0 - Topics
- Flask-RESTPlus for API Documentation
- Namespace Management

#### 1 - Scenario
You are developing a RESTful API and want to use Flask-RESTPlus to provide built-in API documentation and better manage your endpoints using namespaces.

#### 2 - Code
```python
from flask import Flask
from flask_restplus import Api, Resource

app = Flask(__name__)
api = Api(app)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/goodbye')
class Goodbye(Resource):
    def get(self):
        return {'goodbye': 'world'}

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the Flask-RESTPlus implementation in the above code.

#### 4 - Explanation
The code does not use namespaces, which can lead to poorly organized APIs and potential route conflicts in larger applications. Additionally, proper documentation annotations are missing, which reduces the effectiveness of the automatic documentation feature.

#### 5 - Answer
```python
from flask import Flask
from flask_restplus import Api, Resource, Namespace

app = Flask(__name__)
api = Api(app)

hello_ns = Namespace('hello', description='Hello related operations')
goodbye_ns = Namespace('goodbye', description='Goodbye related operations')

@hello_ns.route('/')
class HelloWorld(Resource):
    @hello_ns.doc('get_hello')
    def get(self):
        return {'hello': 'world'}

@goodbye_ns.route('/')
class Goodbye(Resource):
    @goodbye_ns.doc('get_goodbye')
    def get(self):
        return {'goodbye': 'world'}

api.add_namespace(hello_ns)
api.add_namespace(goodbye_ns)

if __name__ == '__main__':
    app.run()
```

---

Question 7

#### 0 - Topics
- Asynchronous Programming with Flask and AsyncIO
- Concurrent Requests Handling

#### 1 - Scenario
You want to enhance your Flask application to handle asynchronous tasks using AsyncIO to improve its performance under heavy load.

#### 2 - Code
```python
from flask import Flask, jsonify
import asyncio

app = Flask(__name__)

@app.route('/data')
async def get_data():
    await asyncio.sleep(2)  # Simulate an asynchronous task
    data = {'value': 'This is async data'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the asynchronous handling implementation in the above code.

#### 4 - Explanation
Flask's default server does not support asynchronous endpoints out-of-the-box. Using async functions with Flask requires an ASGI server such as Uvicorn or Hypercorn to handle asynchronous requests.

#### 5 - Answer
```python
from flask import Flask, jsonify
import asyncio
import os
from hypercorn.asyncio import serve
from hypercorn.config import Config

app = Flask(__name__)

@app.route('/data')
async def get_data():
    await asyncio.sleep(2)  # Simulate an asynchronous task
    data = {'value': 'This is async data'}
    return jsonify(data)

if __name__ == '__main__':
    config = Config()
    config.bind = ["0.0.0.0:5000"]
    asyncio.run(serve(app, config))
```

These questions focus on sophisticated topics like efficient large file handling, role-based access control, API documentation with Flask-RESTPlus, and asynchronous programming with Flask, ensuring that they are challenging for senior developers.

Question 8

#### 0 - Topics
- OAuth2 Authentication with Flask-Dance
- External API Integration

#### 1 - Scenario
You are building a Flask application that requires OAuth2 authentication to allow users to log in with their Google accounts. You decide to use Flask-Dance for this purpose and need to integrate it properly.

#### 2 - Code
```python
from flask import Flask, redirect, url_for
from flask_dance.contrib.google import make_google_blueprint, google

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

google_bp = make_google_blueprint(client_id='my-client-id', client_secret='my-client-secret', redirect_to='google_login')
app.register_blueprint(google_bp, url_prefix='/login')

@app.route('/')
def index():
    return 'Welcome to the Flask app!'

@app.route('/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get('/plus/v1/people/me')
    assert resp.ok, resp.text
    return 'You are connected as {0}'.format(resp.json()['displayName'])

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the OAuth2 authentication implementation in the above code.

#### 4 - Explanation
The code does not handle storing the OAuth token securely or checking for errors during the OAuth flow. Additionally, the redirect URL configuration might be incorrect, and error handling for the Google API response is missing.

#### 5 - Answer
```python
from flask import Flask, redirect, url_for, session
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.consumer.storage.sqla import SQLAlchemyStorage
from flask_sqlalchemy import SQLAlchemy
from flask_dance.consumer import oauth_authorized

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///oauth.db'

db = SQLAlchemy(app)

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

google_bp = make_google_blueprint(client_id='my-client-id', client_secret='my-client-secret', storage=SQLAlchemyStorage(OAuth, db.session, user=current_user))
app.register_blueprint(google_bp, url_prefix='/login')

@app.route('/')
def index():
    return 'Welcome to the Flask app!'

@app.route('/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get('/plus/v1/people/me')
    if not resp.ok:
        return 'Failed to fetch user info', 400
    return 'You are connected as {0}'.format(resp.json()['displayName'])

@oauth_authorized.connect_via(google_bp)
def google_logged_in(blueprint, token):
    # Store the token securely
    session['google_token'] = token

if __name__ == '__main__':
    app.run()
```

---

Question 9

#### 0 - Topics
- Flask-RESTful Advanced Features
- Custom Error Handling

#### 1 - Scenario
You are developing a RESTful API with Flask-RESTful and want to implement custom error handling for your endpoints.

#### 2 - Code
```python
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class CustomError(Exception):
    pass

class HelloWorld(Resource):
    def get(self):
        if 'error' in request.args:
            raise CustomError('This is a custom error')
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the custom error handling implementation in the above code.

#### 4 - Explanation
The code does not include an error handler for the custom error, which means Flask will not know how to handle it, resulting in a generic 500 Internal Server Error response. Custom error handlers should be registered to handle specific exceptions.

#### 5 - Answer
```python
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
api = Api(app)

class CustomError(Exception):
    pass

@app.errorhandler(CustomError)
def handle_custom_error(error):
    response = jsonify({'message': str(error)})
    response.status_code = 400
    return response

class HelloWorld(Resource):
    def get(self):
        if 'error' in request.args:
            raise CustomError('This is a custom error')
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()
```

---

Question 10

#### 0 - Topics
- Flask-Mail for Sending Emails
- Asynchronous Email Sending

#### 1 - Scenario
You are building a Flask application that needs to send email notifications. You want to use Flask-Mail and send the emails asynchronously to avoid blocking the main application thread.

#### 2 - Code
```python
from flask import Flask, render_template
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@example.com'
app.config['MAIL_PASSWORD'] = 'your-password'

mail = Mail(app)

@app.route('/send-email')
def send_email():
    msg = Message('Hello', sender='your-email@example.com', recipients=['recipient@example.com'])
    msg.body = 'This is a test email'
    mail.send(msg)
    return 'Email sent!'

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the email sending implementation in the above code.

#### 4 - Explanation
The code sends the email synchronously, which can block the main thread if the email server is slow or unresponsive. It should send emails asynchronously to improve performance and user experience.

#### 5 - Answer
```python
from flask import Flask, render_template
from flask_mail import Mail, Message
from threading import Thread

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@example.com'
app.config['MAIL_PASSWORD'] = 'your-password'

mail = Mail(app)

def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

@app.route('/send-email')
def send_email():
    msg = Message('Hello', sender='your-email@example.com', recipients=['recipient@example.com'])
    msg.body = 'This is a test email'
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return 'Email sent!'

if __name__ == '__main__':
    app.run()
```

---

Question 11

#### 0 - Topics
- Flask-SQLAlchemy Advanced Querying
- SQL Injection Prevention

#### 1 - Scenario
You are developing an application with Flask-SQLAlchemy and want to ensure your query methods are safe from SQL injection attacks.

#### 2 - Code
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.route('/user/<username>')
def get_user(username):
    user = db.engine.execute(f"SELECT * FROM user WHERE username = '{username}'").fetchone()
    if user:
        return jsonify(username=user['username'], email=user['email'])
    return 'User not found', 404

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the SQL query implementation in the above code.

#### 4 - Explanation
The code uses raw SQL with string interpolation, making it vulnerable to SQL injection attacks. The query should use parameterized queries to prevent SQL injection.

#### 5 - Answer
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.route('/user/<username>')
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify(username=user.username, email=user.email)
    return 'User not found', 404

if __name__ == '__main__':
    app.run()
```

---

These additional questions cover advanced concepts like OAuth2 authentication, custom error handling, asynchronous email sending, and SQL injection prevention. These should challenge even senior developers and test their deep understanding of Flask and associated libraries.

Question 12


#### 0 - Topics
- Flask-Login for User Authentication
- Session Management

#### 1 - Scenario
You are building an application that requires user authentication using Flask-Login. You need to manage user sessions correctly and securely.

#### 2 - Code
```python
from flask import Flask, render_template, redirect, url_for, request
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

users = {1: User(1, 'user1')}

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        user = next((u for u in users.values() if u.username == username), None)
        if user:
            login_user(user)
            return redirect(url_for('protected'))
        return 'Invalid credentials'
    return render_template('login.html')

@app.route('/protected')
@login_required
def protected():
    return f'Logged in as: {current_user.username}'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the user authentication and session management in the above code.

#### 4 - Explanation
The code does not properly handle the case where the user is already logged in and tries to access the login page. Additionally, it lacks proper session protection and security measures such as `remember_me` functionality.

#### 5 - Answer
```python
from flask import Flask, render_template, redirect, url_for, request
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

users = {1: User(1, 'user1')}

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('protected'))
    if request.method == 'POST':
        username = request.form['username']
        user = next((u for u in users.values() if u.username == username), None)
        if user:
            login_user(user, remember=True)
            return redirect(url_for('protected'))
        return 'Invalid credentials'
    return render_template('login.html')

@app.route('/protected')
@login_required
def protected():
    return f'Logged in as: {current_user.username}'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run()
```

---

Question 13

#### 0 - Topics
- Flask-CORS for Cross-Origin Resource Sharing
- Security

#### 1 - Scenario
You are building a Flask API that needs to be accessed by a web application hosted on a different domain. You decide to use Flask-CORS to handle cross-origin resource sharing.

#### 2 - Code
```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/data')
def get_data():
    data = {'value': 'This is CORS-enabled data'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the CORS implementation in the above code.

#### 4 - Explanation
The code enables CORS for all routes and all origins by default, which might pose security risks. It should restrict CORS to specific domains and methods as needed.

#### 5 - Answer
```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/data": {"origins": "http://example.com"}})

@app.route('/data')
def get_data():
    data = {'value': 'This is CORS-enabled data'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
```

---

Question 14

#### 0 - Topics
- Flask-Admin for Admin Interfaces
- Database Management

#### 1 - Scenario
You are building an admin interface for your Flask application using Flask-Admin. You need to manage user records stored in a database.

#### 2 - Code
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

admin = Admin(app)
admin.add_view(ModelView(User, db.session))

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the admin interface implementation in the above code.

#### 4 - Explanation
The code does not provide any authentication or access control for the admin interface, allowing anyone to access it and potentially modify data. It should be secured to restrict access to authorized users only.

#### 5 - Answer
```python
from flask import Flask, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin, AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

login_manager = LoginManager(app)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class MyModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        if not current_user.is_authenticated:
            return redirect(url_for('login'))
        return super(MyAdminIndexView, self).index()

admin = Admin(app, index_view=MyAdminIndexView())
admin.add_view(MyModelView(User, db.session))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        user = User.query.filter_by(username=username).first()
        if user:
            login_user(user)
            return redirect(url_for('admin.index'))
    return render_template('login.html')

if __name__ == '__main__':
    app.run()
```

---

Question 15

#### 0 - Topics
- Flask-Migrate for Database Migrations
- Handling Multiple Database Schemas

#### 1 - Scenario
You are developing a Flask application that needs to manage multiple database schemas using Flask-Migrate.

#### 2 - Code
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the database migration implementation in the above code.

#### 4 - Explanation
The code does not provide a way to manage multiple database schemas effectively. Flask-Migrate can handle only one `db` instance, and the models should be structured to support multiple schemas.

#### 5 - Answer
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)

class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)

class User(Base):
    username = db.Column(db.String(80), unique=True, nullable=False)

class Product(Base):
    name = db.Column(db.String(80), unique=True, nullable=False)

migrate = Migrate(app,

 db)

if __name__ == '__main__':
    app.run()
```

In this corrected version, the `Base` class is used as an abstract base class to share the primary key column among multiple schemas, making it easier to manage migrations for multiple models.

---

These additional questions focus on more advanced Flask concepts like user authentication, cross-origin resource sharing, admin interface security, database migrations, and handling multiple database schemas. These should be challenging and educational for senior developers.


Question 16

#### 0 - Topics
- Caching with Flask-Caching
- Performance Optimization

#### 1 - Scenario
You want to optimize your Flask application's performance by implementing caching for frequently accessed data using Flask-Caching.

#### 2 - Code
```python
from flask import Flask, jsonify
from flask_caching import Cache

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
cache = Cache(app)

@app.route('/data')
@cache.cached(timeout=60)
def get_data():
    # Simulate a time-consuming operation
    import time
    time.sleep(5)
    data = {'value': 'This is cached data'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the potential issues with the caching implementation in the above code.

#### 4 - Explanation
The main issue is that the `cache.cached` decorator should be properly configured with a cache key. Additionally, the cache configuration should be checked to ensure it's set up correctly for the deployment environment.

#### 5 - Answer
```python
from flask import Flask, jsonify
from flask_caching import Cache

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300  # Set a default timeout
cache = Cache(app)

@app.route('/data')
@cache.cached(timeout=60, key_prefix='data_view')
def get_data():
    # Simulate a time-consuming operation
    import time
    time.sleep(5)
    data = {'value': 'This is cached data'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
```

---



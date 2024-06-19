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

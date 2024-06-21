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

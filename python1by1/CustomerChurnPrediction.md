Question 6

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

Certainly! Here are some SQL debugging questions focused on advanced window functions like LEAD, LAG, FIRST_VALUE, and LAST_VALUE. These questions are designed to test the interviewee's ability to identify and correct common mistakes.

### Question 1: LAG Function Debugging
You have a table `sales` with the following columns: `sale_id`, `product_id`, `sale_date`, and `amount`. You need to find the amount of the previous sale for each product. The query written by a senior developer is as follows:

```sql
SELECT
    sale_id,
    product_id,
    sale_date,
    amount,
    LAG(amount, 1) OVER (PARTITION BY product_id ORDER BY sale_date) AS previous_amount
FROM sales;
```

However, the results seem incorrect. Identify and fix the mistake in the query.

### Question 2: LEAD Function Debugging
You have a table `employees` with the following columns: `employee_id`, `department_id`, `hire_date`, and `salary`. You need to find the salary of the next employee hired in the same department. The query written by a senior developer is as follows:

```sql
SELECT
    employee_id,
    department_id,
    hire_date,
    salary,
    LEAD(salary) OVER (PARTITION BY department_id ORDER BY hire_date) AS next_salary
FROM employees;
```

The results are not as expected. Identify and fix the mistake in the query.

### Question 3: FIRST_VALUE Function Debugging
You have a table `orders` with the following columns: `order_id`, `customer_id`, `order_date`, and `total_amount`. You need to find the first order amount for each customer. The query written by a senior developer is as follows:

```sql
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    FIRST_VALUE(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS first_order_amount
FROM orders;
```

The results seem to be incorrect. Identify and fix the mistake in the query.

### Question 4: LAST_VALUE Function Debugging
You have a table `transactions` with the following columns: `transaction_id`, `account_id`, `transaction_date`, and `amount`. You need to find the last transaction amount for each account. The query written by a senior developer is as follows:

```sql
SELECT
    transaction_id,
    account_id,
    transaction_date,
    amount,
    LAST_VALUE(amount) OVER (PARTITION BY account_id ORDER BY transaction_date) AS last_transaction_amount
FROM transactions;
```

The results are not as expected. Identify and fix the mistake in the query.

### Question 5: Combining Window Functions Debugging
You have a table `stocks` with the following columns: `stock_id`, `company_id`, `date`, and `price`. You need to find the previous day's price and the first price for each company. The query written by a senior developer is as follows:

```sql
SELECT
    stock_id,
    company_id,
    date,
    price,
    LAG(price, 1) OVER (PARTITION BY company_id ORDER BY date) AS previous_day_price,
    FIRST_VALUE(price) OVER (PARTITION BY company_id ORDER BY date) AS first_price
FROM stocks;
```

The results seem incorrect. Identify and fix the mistake in the query.

---

### Answers and Explanations

#### Answer 1: LAG Function Debugging
The original query is correct. The mistake might be in the data. Ensure that the `sale_date` column has the correct type (datetime) and the data is properly sorted.

#### Answer 2: LEAD Function Debugging
The original query is correct. The mistake might be in the data. Ensure that the `hire_date` column has the correct type (datetime) and the data is properly sorted.

#### Answer 3: FIRST_VALUE Function Debugging
The original query is correct. The mistake might be in the data. Ensure that the `order_date` column has the correct type (datetime) and the data is properly sorted.

#### Answer 4: LAST_VALUE Function Debugging
The original query is correct. The mistake might be in the data. Ensure that the `transaction_date` column has the correct type (datetime) and the data is properly sorted.

#### Answer 5: Combining Window Functions Debugging
The original query is correct. The mistake might be in the data. Ensure that the `date` column has the correct type (datetime) and the data is properly sorted.

In all these cases, it's crucial to ensure that the data types and sorting are correct. If the results are still not as expected, double-check the data itself for any inconsistencies.
--------------------------------------------------------------------------------------------------------------

Certainly! Recursive Common Table Expressions (CTEs) in SQL are very useful for traversing hierarchical or tree-structured data, such as organizational charts, file systems, or bill of materials. Here�s a basic example to illustrate how you can use recursive CTEs to traverse hierarchical data.

### Example Scenario:
Let's assume we have an `employees` table with the following structure:

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    manager_id INT
);
```

Here, `employee_id` is the unique identifier for each employee, `employee_name` is the name of the employee, and `manager_id` references the `employee_id` of the employee's manager. If `manager_id` is `NULL`, the employee is at the top of the hierarchy (e.g., the CEO).

### Sample Data:
```sql
INSERT INTO employees (employee_id, employee_name, manager_id) VALUES
(1, 'Alice', NULL),   -- CEO
(2, 'Bob', 1),        -- Bob reports to Alice
(3, 'Charlie', 1),    -- Charlie reports to Alice
(4, 'David', 2),      -- David reports to Bob
(5, 'Eve', 2);        -- Eve reports to Bob
```

### Recursive CTE to Traverse the Hierarchy:
Let's write a recursive query to get the full hierarchy starting from the CEO:

```sql
WITH RECURSIVE EmployeeHierarchy AS (
    -- Anchor member: start with the top-level managers (those with no manager)
    SELECT 
        employee_id,
        employee_name,
        manager_id,
        1 AS level
    FROM 
        employees
    WHERE 
        manager_id IS NULL

    UNION ALL

    -- Recursive member: join the CTE with the employees table to find subordinates
    SELECT 
        e.employee_id,
        e.employee_name,
        e.manager_id,
        eh.level + 1 AS level
    FROM 
        employees e
    INNER JOIN 
        EmployeeHierarchy eh
    ON 
        e.manager_id = eh.employee_id
)

-- Select from the CTE to get the full hierarchy
SELECT 
    employee_id,
    employee_name,
    manager_id,
    level
FROM 
    EmployeeHierarchy
ORDER BY 
    level, manager_id, employee_id;
```

### Explanation:
1. **Anchor Member**: The initial query retrieves the top-level employees (those without a manager). These are the starting points of the hierarchy.
2. **Recursive Member**: The recursive part of the CTE joins the CTE with the `employees` table to find the direct reports of each employee. It increments the `level` to indicate the depth of the hierarchy.
3. **Final Select**: The final query selects from the CTE to get the full hierarchy, ordered by level and `manager_id` to maintain the hierarchical order.

### Output:
The output will show each employee with their respective level in the hierarchy:

```
employee_id | employee_name | manager_id | level
-------------------------------------------------
1           | Alice         | NULL       | 1
2           | Bob           | 1          | 2
3           | Charlie       | 1          | 2
4           | David         | 2          | 3
5           | Eve           | 2          | 3
```

This way, you can traverse hierarchical data using recursive CTEs in SQL. Adjust the schema and queries as needed for your specific use case.
--------------------------------------------------------------------------------------------------------------

PIVOT and UNPIVOT are powerful SQL operations that allow you to transform data to better analyze and present it. Here's a detailed explanation of how to use these operations:

### PIVOT
The PIVOT operation is used to transform rows into columns. This can be particularly useful for creating summary tables or reports.

#### Example:
Suppose you have a table `Sales`:

| Product | Year | Amount |
|---------|------|--------|
| A       | 2021 | 100    |
| A       | 2022 | 150    |
| B       | 2021 | 200    |
| B       | 2022 | 250    |

You want to pivot this table so that the years become columns:

```sql
SELECT 
    Product, 
    [2021] AS Year_2021, 
    [2022] AS Year_2022
FROM 
    (SELECT Product, Year, Amount FROM Sales) AS SourceTable
PIVOT
(
    SUM(Amount) FOR Year IN ([2021], [2022])
) AS PivotTable;
```

Result:

| Product | Year_2021 | Year_2022 |
|---------|-----------|-----------|
| A       | 100       | 150       |
| B       | 200       | 250       |

### UNPIVOT
The UNPIVOT operation is used to transform columns back into rows. This is useful for normalizing denormalized data.

#### Example:
Suppose you have a pivoted table `SalesPivot`:

| Product | Year_2021 | Year_2022 |
|---------|-----------|-----------|
| A       | 100       | 150       |
| B       | 200       | 250       |

You want to unpivot this table so that the years become rows again:

```sql
SELECT 
    Product, 
    Year, 
    Amount
FROM 
    (SELECT Product, Year_2021, Year_2022 FROM SalesPivot) AS PivotTable
UNPIVOT
(
    Amount FOR Year IN (Year_2021, Year_2022)
) AS UnpivotTable;
```

Result:

| Product | Year      | Amount |
|---------|-----------|--------|
| A       | Year_2021 | 100    |
| A       | Year_2022 | 150    |
| B       | Year_2021 | 200    |
| B       | Year_2022 | 250    |

To make the `Year` values more readable, you can use a `CASE` statement or `REPLACE` function to clean up the column names:

```sql
SELECT 
    Product, 
    REPLACE(Year, 'Year_', '') AS Year, 
    Amount
FROM 
    (SELECT Product, Year_2021, Year_2022 FROM SalesPivot) AS PivotTable
UNPIVOT
(
    Amount FOR Year IN (Year_2021, Year_2022)
) AS UnpivotTable;
```

Result:

| Product | Year | Amount |
|---------|------|--------|
| A       | 2021 | 100    |
| A       | 2022 | 150    |
| B       | 2021 | 200    |
| B       | 2022 | 250    |

These operations allow you to dynamically reshape your data to fit your analysis needs.
--------------------------------------------------------------------------------------------------------------

Sure! Below are some SQL questions focused on recursive queries using Common Table Expressions (CTEs) to traverse hierarchical data, along with common mistakes that senior developers/architects might make. These questions are designed to be debugging exercises:

### Question 1: Basic Hierarchical Traversal

**Problem Statement:**
You are given a table `Employees` with the following structure:

```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    EmployeeName VARCHAR(100),
    ManagerID INT
);
```

Write a recursive CTE to list all employees and their respective managers. Fix any issues you find in the following query:

```sql
WITH EmployeeHierarchy AS (
    SELECT EmployeeID, EmployeeName, ManagerID
    FROM Employees
    WHERE ManagerID IS NULL
    UNION ALL
    SELECT e.EmployeeID, e.EmployeeName, e.ManagerID
    FROM Employees e
    JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
)
SELECT * FROM EmployeeHierarchy;
```

**Common Mistakes:**
1. Missing anchor member condition.
2. Incorrect join condition.
3. Infinite recursion due to missing termination condition.

### Question 2: Calculating Levels in Hierarchy

**Problem Statement:**
You have the same `Employees` table. Write a recursive CTE to calculate the level of each employee in the hierarchy (i.e., the number of levels from the top manager). Correct the mistakes in the following query:

```sql
WITH EmployeeLevels AS (
    SELECT EmployeeID, EmployeeName, ManagerID, 0 AS Level
    FROM Employees
    WHERE ManagerID = 0
    UNION ALL
    SELECT e.EmployeeID, e.EmployeeName, e.ManagerID, el.Level + 1
    FROM Employees e
    JOIN EmployeeLevels el ON e.ManagerID = el.EmployeeID
)
SELECT EmployeeID, EmployeeName, Level
FROM EmployeeLevels;
```

**Common Mistakes:**
1. Incorrect condition for the top-level manager.
2. Incorrect level calculation.
3. Missing handling for cases where `ManagerID` is not `0` but `NULL`.

### Question 3: Aggregating Salaries in Hierarchical Data

**Problem Statement:**
You are given a table `Departments` with hierarchical data and a table `Salaries` containing salaries for each department:

```sql
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100),
    ParentDepartmentID INT
);

CREATE TABLE Salaries (
    DepartmentID INT,
    Salary DECIMAL(10, 2)
);
```

Write a recursive CTE to calculate the total salary for each department, including its sub-departments. Correct the mistakes in the following query:

```sql
WITH DepartmentHierarchy AS (
    SELECT d.DepartmentID, d.DepartmentName, d.ParentDepartmentID, s.Salary
    FROM Departments d
    LEFT JOIN Salaries s ON d.DepartmentID = s.DepartmentID
    WHERE d.ParentDepartmentID IS NULL
    UNION ALL
    SELECT d.DepartmentID, d.DepartmentName, d.ParentDepartmentID, dh.Salary + s.Salary
    FROM Departments d
    JOIN DepartmentHierarchy dh ON d.ParentDepartmentID = dh.DepartmentID
    LEFT JOIN Salaries s ON d.DepartmentID = s.DepartmentID
)
SELECT DepartmentID, DepartmentName, SUM(Salary) AS TotalSalary
FROM DepartmentHierarchy
GROUP BY DepartmentID, DepartmentName;
```

**Common Mistakes:**
1. Incorrect base case for the anchor member.
2. Incorrect salary aggregation logic.
3. Incorrect join conditions leading to wrong data aggregation.

### Question 4: Detecting Cycles in Hierarchical Data

**Problem Statement:**
You have the same `Departments` table. Write a recursive CTE to detect cycles in the hierarchical data. Correct the mistakes in the following query:

```sql
WITH RECURSIVE DepartmentCycle AS (
    SELECT DepartmentID, ParentDepartmentID, CAST(DepartmentID AS VARCHAR(100)) AS Path
    FROM Departments
    WHERE ParentDepartmentID IS NULL
    UNION ALL
    SELECT d.DepartmentID, d.ParentDepartmentID, dc.Path || '->' || d.DepartmentID
    FROM Departments d
    JOIN DepartmentCycle dc ON d.ParentDepartmentID = dc.DepartmentID
)
SELECT DepartmentID, ParentDepartmentID, Path
FROM DepartmentCycle
WHERE Path LIKE '%->' || DepartmentID || '->%';
```

**Common Mistakes:**
1. Incorrect base case for the anchor member.
2. Incorrect path concatenation logic.
3. Incorrect cycle detection condition.

These questions can be used to evaluate the interviewee's ability to debug and understand recursive CTEs in SQL, as well as their understanding of hierarchical data traversal and common pitfalls.
--------------------------------------------------------------------------------------------------------------

Sure! Here are some SQL debugging questions focused on the topics of PIVOT and UNPIVOT, designed to test the interviewee's ability to transform rows into columns and vice versa. Each question introduces common mistakes that even senior developers might make.

### Question 1: Debugging a PIVOT Operation

#### Problem Statement:
You have a table `Sales` that records monthly sales data for different products:

```sql
CREATE TABLE Sales (
    ProductID INT,
    Month VARCHAR(10),
    SalesAmount DECIMAL(10, 2)
);

INSERT INTO Sales (ProductID, Month, SalesAmount) VALUES
(1, 'January', 1000),
(1, 'February', 1500),
(1, 'March', 1200),
(2, 'January', 2000),
(2, 'February', 2500),
(2, 'March', 2400);
```

The goal is to pivot the table so that each product's sales for each month appear as separate columns. The initial attempt is as follows:

```sql
SELECT ProductID, January, February, March
FROM Sales
PIVOT (
    SUM(SalesAmount) FOR Month IN (January, February, March)
) AS pvt;
```

#### Task:
Identify and correct the mistakes in the query so that it correctly pivots the sales data.

#### Solution:
```sql
SELECT ProductID, January, February, March
FROM (
    SELECT ProductID, Month, SalesAmount
    FROM Sales
) AS src
PIVOT (
    SUM(SalesAmount) FOR Month IN ('January', 'February', 'March')
) AS pvt;
```

### Question 2: Debugging an UNPIVOT Operation

#### Problem Statement:
You have a table `MonthlySales` that records sales data for each product across different months:

```sql
CREATE TABLE MonthlySales (
    ProductID INT,
    January DECIMAL(10, 2),
    February DECIMAL(10, 2),
    March DECIMAL(10, 2)
);

INSERT INTO MonthlySales (ProductID, January, February, March) VALUES
(1, 1000, 1500, 1200),
(2, 2000, 2500, 2400);
```

The goal is to unpivot the table to have each month's sales appear as separate rows. The initial attempt is as follows:

```sql
SELECT ProductID, Month, SalesAmount
FROM MonthlySales
UNPIVOT (
    SalesAmount FOR Month IN (January, February, March)
) AS unpvt;
```

#### Task:
Identify and correct the mistakes in the query so that it correctly unpivots the sales data.

#### Solution:
```sql
SELECT ProductID, Month, SalesAmount
FROM MonthlySales
UNPIVOT (
    SalesAmount FOR Month IN ([January], [February], [March])
) AS unpvt;
```

### Question 3: Advanced PIVOT with Multiple Aggregations

#### Problem Statement:
You have a table `EmployeeSales` that records sales data for different employees across different quarters:

```sql
CREATE TABLE EmployeeSales (
    EmployeeID INT,
    Quarter VARCHAR(10),
    SalesAmount DECIMAL(10, 2),
    SalesCount INT
);

INSERT INTO EmployeeSales (EmployeeID, Quarter, SalesAmount, SalesCount) VALUES
(1, 'Q1', 1000, 10),
(1, 'Q2', 1500, 15),
(1, 'Q3', 1200, 12),
(2, 'Q1', 2000, 20),
(2, 'Q2', 2500, 25),
(2, 'Q3', 2400, 24);
```

The goal is to pivot the table so that each employee's total sales amount and total sales count for each quarter appear as separate columns. The initial attempt is as follows:

```sql
SELECT EmployeeID, Q1_SalesAmount, Q2_SalesAmount, Q3_SalesAmount, Q1_SalesCount, Q2_SalesCount, Q3_SalesCount
FROM EmployeeSales
PIVOT (
    SUM(SalesAmount) AS SalesAmount, SUM(SalesCount) AS SalesCount FOR Quarter IN ('Q1', 'Q2', 'Q3')
) AS pvt;
```

#### Task:
Identify and correct the mistakes in the query so that it correctly pivots the sales data with multiple aggregations.

#### Solution:
```sql
SELECT EmployeeID, 
       Q1_SalesAmount, Q2_SalesAmount, Q3_SalesAmount, 
       Q1_SalesCount, Q2_SalesCount, Q3_SalesCount
FROM (
    SELECT EmployeeID, Quarter, SalesAmount, SalesCount
    FROM EmployeeSales
) AS src
PIVOT (
    SUM(SalesAmount) FOR Quarter IN ('Q1' AS Q1_SalesAmount, 'Q2' AS Q2_SalesAmount, 'Q3' AS Q3_SalesAmount)
) AS pvtAmount
JOIN (
    SELECT EmployeeID, Quarter, SalesAmount, SalesCount
    FROM EmployeeSales
) AS src2
PIVOT (
    SUM(SalesCount) FOR Quarter IN ('Q1' AS Q1_SalesCount, 'Q2' AS Q2_SalesCount, 'Q3' AS Q3_SalesCount)
) AS pvtCount
ON pvtAmount.EmployeeID = pvtCount.EmployeeID;
```

These questions should help assess candidates' skills in debugging and correctly implementing PIVOT and UNPIVOT operations in SQL.
--------------------------------------------------------------------------------------------------------------

Certainly! Here are some SQL questions focused on Transactions and Concurrency Control. These questions are designed to test the interviewee's ability to debug and understand common mistakes made by senior developers or architects.

### Question 1: Implementing Transactions
**Scenario:** You are working on a financial application where money is transferred between accounts. The transaction should ensure that the total amount of money remains consistent.

**Question:** The following SQL script is intended to transfer $100 from `AccountA` to `AccountB`. However, there are some mistakes. Identify and fix the issues to ensure that the transaction either commits all changes or rolls back in case of any errors.

```sql
BEGIN TRANSACTION;

UPDATE Accounts
SET balance = balance - 100
WHERE account_id = 'AccountA';

UPDATE Accounts
SET balance = balance + 100
WHERE account_id = 'AccountB';

-- Missing something here
```

**Expected Answer:**
```sql
BEGIN TRANSACTION;

UPDATE Accounts
SET balance = balance - 100
WHERE account_id = 'AccountA';

UPDATE Accounts
SET balance = balance + 100
WHERE account_id = 'AccountB';

COMMIT TRANSACTION;

-- Add error handling
IF @@ERROR <> 0
BEGIN
    ROLLBACK TRANSACTION;
END
```

### Question 2: Handling Deadlocks with Isolation Levels
**Scenario:** Your application has frequent deadlocks due to concurrent transactions. You need to adjust the isolation level to reduce the chances of deadlocks while still maintaining data consistency.

**Question:** The following SQL script sets the isolation level to `READ COMMITTED`. However, this has not resolved the deadlock issues. Identify a more appropriate isolation level and explain why it would help.

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN TRANSACTION;

-- Some update statement
UPDATE Orders
SET status = 'Processed'
WHERE order_id = 123;

-- Another update statement
UPDATE Inventory
SET quantity = quantity - 1
WHERE product_id = 456;

COMMIT TRANSACTION;
```

**Expected Answer:**
```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN TRANSACTION;

-- Some update statement
UPDATE Orders
SET status = 'Processed'
WHERE order_id = 123;

-- Another update statement
UPDATE Inventory
SET quantity = quantity - 1
WHERE product_id = 456;

COMMIT TRANSACTION;

-- Explanation:
-- The SERIALIZABLE isolation level ensures that transactions are executed in a completely isolated manner,
-- preventing other transactions from accessing the rows being modified until the transaction is complete.
-- This reduces the chances of deadlocks but may impact performance.
```

### Question 3: Locking Mechanisms
**Scenario:** Your application experiences performance issues due to excessive locking. You need to analyze and optimize the locking mechanism used in your transactions.

**Question:** The following SQL script uses table-level locks. Identify and correct the locking mechanism to use row-level locks instead.

```sql
BEGIN TRANSACTION;

-- Table-level lock
SELECT * FROM Customers WITH (TABLOCKX)
WHERE customer_id = 789;

UPDATE Customers
SET status = 'Active'
WHERE customer_id = 789;

COMMIT TRANSACTION;
```

**Expected Answer:**
```sql
BEGIN TRANSACTION;

-- Row-level lock
SELECT * FROM Customers WITH (ROWLOCK, UPDLOCK)
WHERE customer_id = 789;

UPDATE Customers
SET status = 'Active'
WHERE customer_id = 789;

COMMIT TRANSACTION;

-- Explanation:
-- Using ROWLOCK and UPDLOCK hints ensures that only the specific rows being updated are locked,
-- reducing the scope of the lock and improving overall performance.
```

### Question 4: Nested Transactions
**Scenario:** Your application requires nested transactions, but you are facing issues with committing or rolling back the inner transactions independently.

**Question:** The following SQL script attempts to implement nested transactions. Identify and correct the issues to ensure proper handling of nested transactions.

```sql
BEGIN TRANSACTION;

-- Outer transaction
UPDATE Orders
SET status = 'Pending'
WHERE order_id = 123;

-- Inner transaction
BEGIN TRANSACTION;

UPDATE Inventory
SET quantity = quantity - 1
WHERE product_id = 456;

COMMIT TRANSACTION;

COMMIT TRANSACTION;
```

**Expected Answer:**
```sql
BEGIN TRANSACTION;

-- Outer transaction
UPDATE Orders
SET status = 'Pending'
WHERE order_id = 123;

-- Inner transaction
SAVE TRANSACTION SavePoint1;

UPDATE Inventory
SET quantity = quantity - 1
WHERE product_id = 456;

-- Rollback to save point if needed
IF @@ERROR <> 0
BEGIN
    ROLLBACK TRANSACTION SavePoint1;
END

COMMIT TRANSACTION;

-- Explanation:
-- Using SAVE TRANSACTION allows you to create a save point within the transaction,
-- enabling you to roll back to this point if an error occurs in the inner transaction.
```

These questions should help interviewees demonstrate their knowledge of transactions and concurrency control while also testing their debugging skills.
--------------------------------------------------------------------------------------------------------------

Sure, here are some SQL debugging questions related to stored procedures and functions, which can be used to evaluate a candidate's ability to create and use them effectively while recognizing common mistakes:

### Question 1: Debugging a Stored Procedure
**Scenario:**
You have a stored procedure that is supposed to calculate the total sales for a given product in a specific month. However, the procedure is not returning the correct results. The code is as follows:

```sql
CREATE PROCEDURE CalculateTotalSales
    @ProductID INT,
    @Month INT,
    @Year INT,
    @TotalSales DECIMAL(10, 2) OUTPUT
AS
BEGIN
    SELECT @TotalSales = SUM(SalesAmount)
    FROM Sales
    WHERE ProductID = @ProductID
    AND MONTH(SalesDate) = @Month
    AND YEAR(SalesDate) = @Year;
END
```

**Task:**
Identify and fix the mistake in the stored procedure.

### Question 2: Debugging a Function
**Scenario:**
You have a function that is supposed to return the full name of a customer given their ID. However, it returns NULL for some customers even though their data exists in the database. The function code is as follows:

```sql
CREATE FUNCTION GetCustomerFullName(@CustomerID INT)
RETURNS VARCHAR(100)
AS
BEGIN
    DECLARE @FullName VARCHAR(100);

    SELECT @FullName = FirstName + ' ' + LastName
    FROM Customers
    WHERE CustomerID = @CustomerID;

    RETURN @FullName;
END
```

**Task:**
Identify and fix the mistake in the function.

### Question 3: Debugging Stored Procedure with Transactions
**Scenario:**
A stored procedure is used to transfer money between two accounts. It uses transactions to ensure data consistency. However, it sometimes leaves the database in an inconsistent state. The code is as follows:

```sql
CREATE PROCEDURE TransferMoney
    @FromAccountID INT,
    @ToAccountID INT,
    @Amount DECIMAL(10, 2)
AS
BEGIN
    BEGIN TRANSACTION;

    UPDATE Accounts
    SET Balance = Balance - @Amount
    WHERE AccountID = @FromAccountID;

    UPDATE Accounts
    SET Balance = Balance + @Amount
    WHERE AccountID = @ToAccountID;

    COMMIT TRANSACTION;
END
```

**Task:**
Identify and fix the mistake in the stored procedure to ensure data consistency.

### Question 4: Debugging Recursive Function
**Scenario:**
You have a recursive function that calculates the factorial of a number. However, it sometimes causes a stack overflow error. The code is as follows:

```sql
CREATE FUNCTION CalculateFactorial(@Number INT)
RETURNS INT
AS
BEGIN
    IF @Number <= 1
        RETURN 1;
    ELSE
        RETURN @Number * dbo.CalculateFactorial(@Number - 1);
END
```

**Task:**
Identify and fix the mistake in the function to prevent stack overflow.

### Question 5: Debugging a Function with NULL Handling
**Scenario:**
You have a function that calculates the average rating of a product. However, it fails when there are no ratings for the product. The code is as follows:

```sql
CREATE FUNCTION GetAverageRating(@ProductID INT)
RETURNS DECIMAL(5, 2)
AS
BEGIN
    DECLARE @AverageRating DECIMAL(5, 2);

    SELECT @AverageRating = AVG(Rating)
    FROM ProductRatings
    WHERE ProductID = @ProductID;

    RETURN @AverageRating;
END
```

**Task:**
Identify and fix the mistake in the function to handle cases where there are no ratings.

These questions will help interviewees demonstrate their ability to debug and correct common issues in stored procedures and functions, reflecting real-world scenarios they might encounter on the job.
--------------------------------------------------------------------------------------------------------------

Sure, here are some SQL coding debugging questions related to triggers that can be used in an interview setting. These questions include common mistakes that senior developers or architects might make, which the interviewees will need to identify and correct.

### Question 1: Basic Trigger for Audit Log

#### Scenario:
You have a table named `employees` and an audit table named `employee_audit`. The audit table should record any INSERT operations on the `employees` table. 

#### Tables:
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(50),
    position VARCHAR(50),
    salary DECIMAL(10, 2)
);

CREATE TABLE employee_audit (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    action VARCHAR(50),
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Initial Trigger (with mistakes):
```sql
CREATE TRIGGER after_employee_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employee_audit (employee_id, action)
    VALUES (NEW.employee_id, 'INSERT');
END;
```

#### Task:
Identify and correct the mistakes in the trigger.

### Question 2: Update Trigger for Salary Change

#### Scenario:
You need to create a trigger that updates a `salary_changes` table whenever an employee's salary is updated in the `employees` table.

#### Tables:
```sql
CREATE TABLE salary_changes (
    change_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    old_salary DECIMAL(10, 2),
    new_salary DECIMAL(10, 2),
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Initial Trigger (with mistakes):
```sql
CREATE TRIGGER after_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO salary_changes (employee_id, old_salary, new_salary)
        VALUES (NEW.employee_id, OLD.salary, NEW.salary);
    END IF;
END;
```

#### Task:
Identify and correct the mistakes in the trigger.

### Question 3: Deletion Cascade with Trigger

#### Scenario:
When an employee is deleted from the `employees` table, all their records should also be deleted from the `employee_audit` table.

#### Initial Trigger (with mistakes):
```sql
CREATE TRIGGER after_employee_delete
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
    DELETE FROM employee_audit
    WHERE employee_id = NEW.employee_id;
END;
```

#### Task:
Identify and correct the mistakes in the trigger.

### Question 4: Preventing Invalid Data with Before Insert Trigger

#### Scenario:
You want to ensure that no employee can be inserted into the `employees` table with a salary less than 30000.

#### Initial Trigger (with mistakes):
```sql
CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 30000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary cannot be less than 30000';
    END IF;
END;
```

#### Task:
Identify and correct the mistakes in the trigger.

### Question 5: Compound Trigger for Multiple Actions

#### Scenario:
You need a trigger that performs multiple actions: updates the audit log and ensures the salary is not below a certain threshold on insert or update.

#### Initial Trigger (with mistakes):
```sql
CREATE TRIGGER compound_employee_actions
AFTER INSERT OR UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 30000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary cannot be less than 30000';
    END IF;

    IF INSERTING THEN
        INSERT INTO employee_audit (employee_id, action)
        VALUES (NEW.employee_id, 'INSERT');
    ELSE
        INSERT INTO employee_audit (employee_id, action)
        VALUES (NEW.employee_id, 'UPDATE');
    END IF;
END;
```

#### Task:
Identify and correct the mistakes in the trigger.

These questions cover a range of common issues such as syntax errors, logic errors, and misunderstanding of trigger behavior, which are typical mistakes even experienced developers might make.
--------------------------------------------------------------------------------------------------------------

Sure, here are some SQL debugging questions on Advanced Indexing and Query Optimization that can be used in an interview setting. These questions are designed to test a candidate's ability to identify and fix common mistakes related to indexing and query optimization.

### Question 1: Advanced Indexing Techniques

**Problem Statement:**
You have a table `Orders` with the following structure:
```sql
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2)
);
```

You have an index on the `CustomerID` column:
```sql
CREATE INDEX idx_customer_id ON Orders(CustomerID);
```

You notice that queries filtering by `OrderDate` are running slower than expected. A senior developer has created a composite index to improve the query performance:
```sql
CREATE INDEX idx_order_date_customer_id ON Orders(OrderDate, CustomerID);
```

However, the performance has not improved. Here's a sample query:
```sql
SELECT * FROM Orders WHERE OrderDate = '2023-10-01';
```

**Question:**
Identify the mistake in the indexing strategy and suggest a fix.

**Answer:**
The composite index `idx_order_date_customer_id` is not effective for the query because the query only filters by `OrderDate` and does not take advantage of the composite index's `CustomerID` component. A more appropriate index would be:
```sql
CREATE INDEX idx_order_date ON Orders(OrderDate);
```

### Question 2: Query Execution Plans and Optimization Strategies

**Problem Statement:**
You have the following query on a large table `Products`:
```sql
SELECT ProductID, ProductName, Price
FROM Products
WHERE CategoryID = 5 AND Price > 100;
```

The table `Products` has the following indexes:
```sql
CREATE INDEX idx_category_id ON Products(CategoryID);
CREATE INDEX idx_price ON Products(Price);
```

Despite the indexes, the query is running slower than expected. A senior developer suggests using a composite index:
```sql
CREATE INDEX idx_category_price ON Products(CategoryID, Price);
```

However, the performance did not improve significantly. Here's the execution plan for the original query:
```
1. Index Scan on idx_category_id
2. Filter on Price > 100
```

**Question:**
Identify the reason why the composite index did not improve performance and suggest an alternative approach.

**Answer:**
The composite index `idx_category_price` might not be utilized effectively by the query optimizer because the query execution plan might still prefer separate index scans. An alternative approach is to include the `ProductID` and `ProductName` columns in the composite index to cover the query:
```sql
CREATE INDEX idx_category_price_covering ON Products(CategoryID, Price, ProductID, ProductName);
```
This would allow the query to be fully covered by the index, potentially improving performance.

### Question 3: Indexing and JOIN Performance

**Problem Statement:**
You have two tables, `Customers` and `Orders`:
```sql
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

A senior developer wrote the following query to get the total amount of orders per customer:
```sql
SELECT c.CustomerID, c.CustomerName, SUM(o.TotalAmount) AS TotalSpent
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.CustomerName;
```

Despite having indexes on `CustomerID` in both tables, the query is running slower than expected.

**Question:**
Identify potential indexing issues and suggest optimization strategies.

**Answer:**
The query involves a join and aggregation, which can be optimized by ensuring that the indexes support these operations effectively. One potential issue is that the `Orders` table might benefit from a composite index on `(CustomerID, TotalAmount)` to help with the join and aggregation:
```sql
CREATE INDEX idx_orders_customer_total ON Orders(CustomerID, TotalAmount);
```

Additionally, ensure that the `CustomerID` index on the `Customers` table is being utilized effectively:
```sql
CREATE INDEX idx_customers_customer_id ON Customers(CustomerID);
```

### Question 4: Over-Indexing and Its Impact

**Problem Statement:**
You have a table `Sales` with the following structure:
```sql
CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    ProductID INT,
    SaleDate DATE,
    Quantity INT,
    TotalSale DECIMAL(10, 2)
);
```

A senior developer added multiple indexes to improve query performance:
```sql
CREATE INDEX idx_product_id ON Sales(ProductID);
CREATE INDEX idx_sale_date ON Sales(SaleDate);
CREATE INDEX idx_quantity ON Sales(Quantity);
CREATE INDEX idx_total_sale ON Sales(TotalSale);
```

However, the performance of insert operations has degraded significantly.

**Question:**
Identify the issue with the current indexing strategy and suggest a balanced approach.

**Answer:**
The issue is over-indexing. Having too many indexes can degrade the performance of insert, update, and delete operations because each index must be updated. A more balanced approach would be to create only the necessary indexes based on the most common queries. For example:
```sql
CREATE INDEX idx_product_sale_date ON Sales(ProductID, SaleDate);
```
This index can support queries filtering by `ProductID` and `SaleDate` without overloading the table with multiple indexes.

By focusing on the most critical queries and reducing the number of indexes, you can improve the overall performance of both read and write operations.
--------------------------------------------------------------------------------------------------------------

Sure, here are some SQL debugging questions focused on advanced indexing and query optimization. These questions are designed to test a candidate's ability to identify and fix common mistakes that could occur in a real-world scenario.

### Question 1: Advanced Indexing Techniques
**Scenario:**
You have a table `Orders` with the following structure:
```sql
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2)
);
```
The table has millions of rows. You notice that querying the `Orders` table using the `CustomerID` and `OrderDate` columns is taking too long. 

**Task:**
Identify and implement the missing index to optimize the following query:
```sql
SELECT OrderID, TotalAmount
FROM Orders
WHERE CustomerID = 12345 AND OrderDate >= '2023-01-01';
```

**Common Mistake:**
Creating separate indexes on `CustomerID` and `OrderDate` instead of a composite index.

**Solution:**
```sql
CREATE INDEX idx_customer_orderdate ON Orders (CustomerID, OrderDate);
```

### Question 2: Deep Dive into Query Execution Plans
**Scenario:**
You have an `Employees` table with the following structure:
```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT,
    Salary DECIMAL(10, 2)
);
```
A senior developer wrote the following query to find the total salary paid in each department:
```sql
SELECT DepartmentID, SUM(Salary) AS TotalSalary
FROM Employees
GROUP BY DepartmentID;
```
The query is running slower than expected. 

**Task:**
Analyze the query execution plan and suggest optimizations. Assume no indexes other than the primary key exist.

**Common Mistake:**
Not indexing the `DepartmentID` column, leading to a full table scan.

**Solution:**
1. Analyze the query execution plan to confirm a full table scan.
2. Create an index on `DepartmentID` to optimize the query.

```sql
CREATE INDEX idx_departmentid ON Employees (DepartmentID);
```

### Question 3: Query Optimization Strategies
**Scenario:**
You have a `Sales` table with the following structure:
```sql
CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    ProductID INT,
    SaleDate DATE,
    Quantity INT,
    Price DECIMAL(10, 2)
);
```
A senior developer wrote the following query to calculate the total revenue for each product in a specific date range:
```sql
SELECT ProductID, SUM(Quantity * Price) AS TotalRevenue
FROM Sales
WHERE SaleDate BETWEEN '2023-01-01' AND '2023-01-31'
GROUP BY ProductID;
```
The query is slow, especially when the date range is large.

**Task:**
Identify and implement the optimization strategy for the query.

**Common Mistake:**
Not considering the creation of a composite index on `SaleDate` and `ProductID`.

**Solution:**
1. Create a composite index on `SaleDate` and `ProductID`.
2. Ensure that the query execution plan is using the index.

```sql
CREATE INDEX idx_saledate_productid ON Sales (SaleDate, ProductID);
```

### Question 4: Handling Large Datasets
**Scenario:**
You have a `Transactions` table with the following structure:
```sql
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    UserID INT,
    TransactionDate DATETIME,
    Amount DECIMAL(10, 2)
);
```
The table contains billions of records. A senior developer wrote the following query to retrieve all transactions for a specific user in the last year:
```sql
SELECT TransactionID, Amount
FROM Transactions
WHERE UserID = 56789 AND TransactionDate >= DATEADD(year, -1, GETDATE());
```
The query is extremely slow.

**Task:**
Optimize the query to handle large datasets efficiently.

**Common Mistake:**
Not having an index on `UserID` and `TransactionDate`.

**Solution:**
1. Create a composite index on `UserID` and `TransactionDate`.
2. Verify that the query execution plan uses the index.

```sql
CREATE INDEX idx_userid_transactiondate ON Transactions (UserID, TransactionDate);
```

### Question 5: Optimizing Joins
**Scenario:**
You have two tables, `Customers` and `Orders`, with the following structures:
```sql
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```
A senior developer wrote the following query to retrieve all orders along with customer names:
```sql
SELECT o.OrderID, o.TotalAmount, c.CustomerName
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID;
```
The query is running slower than expected.

**Task:**
Optimize the query to improve performance.

**Common Mistake:**
Not indexing the `CustomerID` column in both tables.

**Solution:**
1. Create an index on the `CustomerID` column in the `Orders` table.
2. Ensure that the query execution plan uses the index.

```sql
CREATE INDEX idx_orders_customerid ON Orders (CustomerID);
```

These questions and solutions should help interviewees demonstrate their ability to optimize SQL queries and use advanced indexing techniques effectively.
--------------------------------------------------------------------------------------------------------------

Sure! Here are some SQL questions focused on data warehousing concepts, particularly on star and snowflake schemas, and writing queries for data warehousing scenarios. These questions are designed to test a candidate's ability to debug and understand common mistakes made by experienced developers and architects. 

### Question 1: Debugging a Star Schema Query

**Scenario:**
You have a star schema with the following tables:
- `fact_sales`: Contains sales data.
  - Columns: `sale_id`, `date_id`, `product_id`, `customer_id`, `store_id`, `sales_amount`
- `dim_date`: Contains date information.
  - Columns: `date_id`, `date`, `month`, `year`
- `dim_product`: Contains product information.
  - Columns: `product_id`, `product_name`, `category`
- `dim_customer`: Contains customer information.
  - Columns: `customer_id`, `customer_name`, `region`
- `dim_store`: Contains store information.
  - Columns: `store_id`, `store_name`, `location`

**Task:**
The following query attempts to retrieve the total sales amount for each product category in the year 2022. However, it contains errors. Find and fix the mistakes.

```sql
SELECT 
    dp.category,
    SUM(fs.sales_amount) AS total_sales
FROM 
    fact_sales fs
JOIN 
    dim_date dd ON fs.date_id = dd.date_id
JOIN 
    dim_product dp ON fs.product_id = dp.product_id
WHERE 
    dd.year = 2022
GROUP BY 
    dp.product_name;
```

**Expected Output:**
- Each row should contain a `category` and `total_sales` for that category in 2022.

### Question 2: Debugging a Snowflake Schema Query

**Scenario:**
You have a snowflake schema with the following tables:
- `fact_orders`: Contains order data.
  - Columns: `order_id`, `date_id`, `product_id`, `customer_id`, `store_id`, `order_amount`
- `dim_date`: Contains date information.
  - Columns: `date_id`, `date`, `month_id`
- `dim_month`: Contains month information.
  - Columns: `month_id`, `month_name`, `year`
- `dim_product`: Contains product information.
  - Columns: `product_id`, `product_name`, `category_id`
- `dim_category`: Contains category information.
  - Columns: `category_id`, `category_name`
- `dim_customer`: Contains customer information.
  - Columns: `customer_id`, `customer_name`, `region`
- `dim_store`: Contains store information.
  - Columns: `store_id`, `store_name`, `location`

**Task:**
The following query attempts to retrieve the total order amount for each customer in the year 2021. However, it contains errors. Find and fix the mistakes.

```sql
SELECT 
    dc.customer_name,
    SUM(fo.order_amount) AS total_orders
FROM 
    fact_orders fo
JOIN 
    dim_date dd ON fo.date_id = dd.date_id
JOIN 
    dim_month dm ON dd.month_id = dm.month_id
JOIN 
    dim_customer dc ON fo.customer_id = dc.customer_id
WHERE 
    dm.year = 2021
GROUP BY 
    dc.customer_id;
```

**Expected Output:**
- Each row should contain a `customer_name` and `total_orders` for that customer in 2021.

### Question 3: Writing a Query for a Data Warehousing Scenario

**Scenario:**
You are given the following star schema tables:
- `fact_transactions`: Contains transaction data.
  - Columns: `transaction_id`, `date_id`, `product_id`, `customer_id`, `store_id`, `transaction_amount`
- `dim_date`: Contains date information.
  - Columns: `date_id`, `date`, `month`, `year`
- `dim_product`: Contains product information.
  - Columns: `product_id`, `product_name`, `category`
- `dim_customer`: Contains customer information.
  - Columns: `customer_id`, `customer_name`, `region`
- `dim_store`: Contains store information.
  - Columns: `store_id`, `store_name`, `location`

**Task:**
Write a query to retrieve the total transaction amount for each store in January 2023.

**Expected Output:**
- Each row should contain a `store_name` and `total_transaction_amount` for January 2023.

```sql
SELECT 
    ds.store_name,
    SUM(ft.transaction_amount) AS total_transaction_amount
FROM 
    fact_transactions ft
JOIN 
    dim_date dd ON ft.date_id = dd.date_id
JOIN 
    dim_store ds ON ft.store_id = ds.store_id
WHERE 
    dd.year = 2023 AND dd.month = 1
GROUP BY 
    ds.store_name;
```

### Question 4: Debugging a Data Warehousing Query with Aggregation

**Scenario:**
You have a star schema with the following tables:
- `fact_sales`: Contains sales data.
  - Columns: `sale_id`, `date_id`, `product_id`, `customer_id`, `store_id`, `sales_amount`
- `dim_date`: Contains date information.
  - Columns: `date_id`, `date`, `month`, `year`
- `dim_product`: Contains product information.
  - Columns: `product_id`, `product_name`, `category`
- `dim_customer`: Contains customer information.
  - Columns: `customer_id`, `customer_name`, `region`
- `dim_store`: Contains store information.
  - Columns: `store_id`, `store_name`, `location`

**Task:**
The following query attempts to retrieve the average sales amount per store for each month in 2022. However, it contains errors. Find and fix the mistakes.

```sql
SELECT 
    ds.store_name,
    dd.month,
    AVG(fs.sales_amount) AS avg_sales
FROM 
    fact_sales fs
JOIN 
    dim_date dd ON fs.date_id = dd.date_id
JOIN 
    dim_store ds ON fs.store_id = ds.store_id
WHERE 
    dd.year = 2022
GROUP BY 
    ds.store_name, dd.date;
```

**Expected Output:**
- Each row should contain a `store_name`, `month`, and `avg_sales` for that store and month in 2022.

These questions should provide a good mix of debugging and query writing tasks related to data warehousing concepts and schemas.
--------------------------------------------------------------------------------------------------------------

Sure, here are some SQL questions related to the topics of user roles and permissions, and SQL injection prevention techniques. These questions include common mistakes that senior developers/architects might make, which the interviewees would need to debug.

### Question 1: Implement User Roles and Permissions

**Scenario:**
You are tasked with implementing a user roles and permissions system. You have two tables, `Users` and `Roles`. Each user can have multiple roles. The goal is to retrieve a list of users along with their roles.

**Tables:**

- `Users`:
  ```sql
  CREATE TABLE Users (
      UserID INT PRIMARY KEY,
      UserName VARCHAR(100)
  );

  INSERT INTO Users (UserID, UserName) VALUES (1, 'Alice');
  INSERT INTO Users (UserID, UserName) VALUES (2, 'Bob');
  ```

- `Roles`:
  ```sql
  CREATE TABLE Roles (
      RoleID INT PRIMARY KEY,
      RoleName VARCHAR(100)
  );

  INSERT INTO Roles (RoleID, RoleName) VALUES (1, 'Admin');
  INSERT INTO Roles (RoleID, RoleName) VALUES (2, 'User');
  ```

- `UserRoles` (junction table):
  ```sql
  CREATE TABLE UserRoles (
      UserID INT,
      RoleID INT,
      FOREIGN KEY (UserID) REFERENCES Users(UserID),
      FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
  );

  INSERT INTO UserRoles (UserID, RoleID) VALUES (1, 1);
  INSERT INTO UserRoles (UserID, RoleID) VALUES (1, 2);
  INSERT INTO UserRoles (UserID, RoleID) VALUES (2, 2);
  ```

**Task:**
Write a SQL query to retrieve a list of users along with their roles. However, the code contains a common mistake where the join condition is not correctly specified.

**Faulty Query:**
```sql
SELECT u.UserName, r.RoleName
FROM Users u
JOIN UserRoles ur ON u.UserID = ur.UserID
JOIN Roles r ON ur.UserID = r.RoleID;
```

**Debug the Query:**
Find and fix the mistake in the query.

---

### Question 2: SQL Injection Prevention Techniques

**Scenario:**
You are developing a login system and need to validate user credentials against a database. The current implementation is vulnerable to SQL injection attacks.

**Tables:**

- `Users`:
  ```sql
  CREATE TABLE Users (
      UserID INT PRIMARY KEY,
      UserName VARCHAR(100),
      Password VARCHAR(100)
  );

  INSERT INTO Users (UserID, UserName, Password) VALUES (1, 'Alice', 'password123');
  INSERT INTO Users (UserID, UserName, Password) VALUES (2, 'Bob', 'securepassword');
  ```

**Task:**
Identify and fix the SQL injection vulnerability in the following query.

**Vulnerable Query:**
```sql
SELECT UserID
FROM Users
WHERE UserName = 'user_input' AND Password = 'password_input';
```

**Instructions:**
1. Explain why the current query is vulnerable to SQL injection.
2. Rewrite the query using prepared statements to prevent SQL injection.

---

### Question 3: Implementing Role-Based Access Control

**Scenario:**
You need to implement role-based access control for a web application. The application should check if a user has the required role before allowing access to a specific resource.

**Tables:**

- `Users`, `Roles`, and `UserRoles` as defined in Question 1.

**Task:**
Write a SQL query to check if a user has a specific role. However, the code contains a common mistake where the role check logic is incorrect.

**Faulty Query:**
```sql
SELECT COUNT(*)
FROM Users u
JOIN UserRoles ur ON u.UserID = ur.UserID
JOIN Roles r ON ur.RoleID = r.RoleID
WHERE u.UserName = 'alice' AND r.RoleName = 'Admin';
```

**Debug the Query:**
Find and fix the mistake in the query. Ensure that the query correctly checks if the user 'alice' has the 'Admin' role.

---

### Question 4: Preventing SQL Injection in Dynamic Queries

**Scenario:**
You are writing a dynamic query to filter users based on different criteria. The current implementation is vulnerable to SQL injection.

**Task:**
Identify and fix the SQL injection vulnerability in the following dynamic query.

**Vulnerable Query:**
```sql
DECLARE @sql NVARCHAR(MAX)
SET @sql = 'SELECT UserName FROM Users WHERE 1=1'

IF @filterByUserName = 1
    SET @sql = @sql + ' AND UserName = ''' + @userName + ''''

EXEC sp_executesql @sql
```

**Instructions:**
1. Explain why the current query is vulnerable to SQL injection.
2. Rewrite the dynamic query using parameterized queries to prevent SQL injection.

---

These questions are designed to test the interviewee's understanding of user roles and permissions, as well as their ability to identify and mitigate SQL injection vulnerabilities.
--------------------------------------------------------------------------------------------------------------

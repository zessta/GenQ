### 1. Basic Syntax and Data Types

#### Question 1: Incorrect Data Type Usage
```csharp
// The following function is supposed to calculate the area of a rectangle.
// However, it is not working correctly. Can you identify the mistake and fix it?
public class Rectangle
{
    public double CalculateArea(string length, string width)
    {
        double area = length * width;
        return area;
    }
}

// Sample usage:
// Rectangle rect = new Rectangle();
// double area = rect.CalculateArea("5", "10");
// Console.WriteLine(area); // Expected output: 50
```
**Mistake:** The method parameters are of type `string`, which should be `double` or `int`. Multiplying strings directly will cause a compilation error.        

**Solution:**
```csharp
public class Rectangle
{
    public double CalculateArea(double length, double width)
    {
        double area = length * width;
        return area;
    }
}

// Sample usage:
// Rectangle rect = new Rectangle();
// double area = rect.CalculateArea(5, 10);
// Console.WriteLine(area); // Expected output: 50
```

#### Question 2: Variable Scope Issue
```csharp
// The following function is intended to swap the values of two integers.
// However, the swapping does not seem to work correctly. Can you find the issue?
public class Swapper
{
    public void Swap(int a, int b)
    {
        int temp = a;
        a = b;
        b = temp;
    }
}

// Sample usage:
// Swapper swapper = new Swapper();
// int x = 5, y = 10;
// swapper.Swap(x, y);
// Console.WriteLine($"x: {x}, y: {y}"); // Expected output: x: 10, y: 5
```
**Mistake:** The method parameters are passed by value, not by reference, so the swap only affects the local variables within the method.

**Solution:**
```csharp
public class Swapper
{
    public void Swap(ref int a, ref int b)
    {
        int temp = a;
        a = b;
        b = temp;
    }
}

// Sample usage:
// Swapper swapper = new Swapper();
// int x = 5, y = 10;
// swapper.Swap(ref x, ref y);
// Console.WriteLine($"x: {x}, y: {y}"); // Expected output: x: 10, y: 5
```

#### Question 3: Constant Misuse
```csharp
// The following code is intended to calculate the circumference of a circle.
// However, it seems to be giving incorrect results. Can you find and fix the mistake?
public class Circle
{
    public static void Main(string[] args)
    {
        const double PI = 3.14;
        double radius = 5;
        double circumference = CalculateCircumference(radius);
        Console.WriteLine($"Circumference: {circumference}");
    }

    public static double CalculateCircumference(double radius)
    {
        return 2 * PI * radius;
    }
}
```
**Mistake:** The constant `PI` is defined in the `Main` method and is not accessible in the `CalculateCircumference` method.

**Solution:**
```csharp
public class Circle
{
    private const double PI = 3.14;

    public static void Main(string[] args)
    {
        double radius = 5;
        double circumference = CalculateCircumference(radius);
        Console.WriteLine($"Circumference: {circumference}");
    }

    public static double CalculateCircumference(double radius)
    {
        return 2 * PI * radius;
    }
}
```

These questions are designed to test the candidate's ability to debug common mistakes related to basic syntax and data types in C#.



### Topic: Use of if-else, switch-case, loops (for, while, do-while)

1. **If-Else and Loops**
   ```csharp
   public class DebugIfElseLoops
   {
       public static int CalculateSum(int[] numbers)
       {
           int sum = 0;
           for (int i = 0; i <= numbers.Length; i++)
           {
               if (numbers[i] > 0)
               {
                   sum += numbers[i];
               }
               else if (numbers[i] < 0)
               {
                   sum -= numbers[i];
               }
               else
               {
                   sum += 0;
               }
           }
           return sum;
       }

       public static void Main(string[] args)
       {
           int[] numbers = { 1, 2, -3, 4, 0, 5 };
           int result = CalculateSum(numbers);
           Console.WriteLine("Sum: " + result);
       }
   }
   ```

   **Question**: Identify and fix the issues in the `CalculateSum` method. What will be the correct output for the provided array?

   **Answer**: The loop condition `i <= numbers.Length` should be `i < numbers.Length` to avoid an `IndexOutOfRangeException`. The correct output should be `15`.

2. **Switch-Case**
   ```csharp
   public class DebugSwitchCase
   {
       public static string GetDayName(int day)
       {
           string dayName;
           switch (day)
           {
               case 1:
                   dayName = "Monday";
                   break;
               case 2:
                   dayName = "Tuesday";
                   break;
               case 3:
                   dayName = "Wednesday";
                   break;
               case 4:
                   dayName = "Thursday";
                   break;
               case 5:
                   dayName = "Friday";
                   break;
               case 6:
                   dayName = "Saturday";
                   break;
               case 7:
                   dayName = "Sunday";
                   break;
               default:
                   dayName = "Invalid day";
           }
           return dayName;
       }

       public static void Main(string[] args)
       {
           Console.WriteLine(GetDayName(5));  // Expected output: "Friday"
           Console.WriteLine(GetDayName(8));  // Expected output: "Invalid day"
       }
   }
   ```

   **Question**: Identify and fix the issues in the `GetDayName` method. What will be the correct output for the provided inputs?

   **Answer**: The method `GetDayName` is correct. No changes are needed. The correct outputs are "Friday" and "Invalid day".

3. **While and Do-While Loops**
   ```csharp
   public class DebugWhileDoWhile
   {
       public static int CountDown(int start)
       {
           int counter = 0;
           while (start >= 0)
           {
               Console.WriteLine(start);
               start--;
               counter++;
           }
           do
           {
               Console.WriteLine(start);
               start--;
               counter++;
           } while (start > 0);

           return counter;
       }

       public static void Main(string[] args)
       {
           int count = CountDown(3);
           Console.WriteLine("Counter: " + count);
       }
   }
   ```

   **Question**: Identify and fix the issues in the `CountDown` method. What will be the correct output for the provided input?

   **Answer**: The `do-while` loop should not run if `start` is already less than or equal to zero after the `while` loop. The correct implementation would be: 
   ```csharp
   public static int CountDown(int start)
   {
       int counter = 0;
       while (start >= 0)
       {
           Console.WriteLine(start);
           start--;
           counter++;
       }
       // Removing the do-while loop
       return counter;
   }
   ```
   The correct output is:
   ```
   3
   2
   1
   0
   Counter: 4
   ```

### Topic: Understanding of break and continue statements

4. **Break Statement**
   ```csharp
   public class DebugBreak
   {
       public static int FindFirstNegative(int[] numbers)
       {
           int firstNegative = 0;
           for (int i = 0; i < numbers.Length; i++)
           {
               if (numbers[i] < 0)
               {
                   firstNegative = numbers[i];
                   break;
               }
           }
           return firstNegative;
       }

       public static void Main(string[] args)
       {
           int[] numbers = { 1, 2, 3, -4, 5, -6 };
           int result = FindFirstNegative(numbers);
           Console.WriteLine("First Negative Number: " + result);
       }
   }
   ```

   **Question**: Identify and fix the issues in the `FindFirstNegative` method. What will be the correct output for the provided array?

   **Answer**: The variable `firstNegative` should be initialized to a value that indicates no negative number was found (e.g., `int firstNegative = int.MinValue;`). The correct output is `-4`.

5. **Continue Statement**
   ```csharp
   public class DebugContinue
   {
       public static int SumPositives(int[] numbers)
       {
           int sum = 0;
           for (int i = 0; i < numbers.Length; i++)
           {
               if (numbers[i] < 0)
               {
                   continue;
               }
               sum += numbers[i];
           }
           return sum;
       }

       public static void Main(string[] args)
       {
           int[] numbers = { 1, -2, 3, -4, 5, -6 };
           int result = SumPositives(numbers);
           Console.WriteLine("Sum of Positives: " + result);
       }
   }
   ```

   **Question**: Identify and fix the issues in the `SumPositives` method. What will be the correct output for the provided array?

   **Answer**: The method `SumPositives` is correct. No changes are needed. The correct output is `9`.

### Topic: Working with Arrays and Lists

**Question 1: Array Indexing Error**

```csharp
public class ArrayIndexing
{
    public static int FindMax(int[] numbers)
    {
        int max = numbers[0];
        for (int i = 1; i <= numbers.Length; i++)
        {
            if (numbers[i] > max)
            {
                max = numbers[i];
            }
        }
        return max;
    }

    public static void Main(string[] args)
    {
        int[] numbers = { 3, 5, 7, 2, 8 };
        Console.WriteLine("The maximum number is: " + FindMax(numbers));
    }
}
```

**Question:**
The above code is intended to find the maximum number in an array. However, it throws an `IndexOutOfRangeException`. Identify and fix the issue.

**Answer:**
The loop condition should be `i < numbers.Length` instead of `i <= numbers.Length`.

```csharp
for (int i = 1; i < numbers.Length; i++)
```

---

**Question 2: List Initialization and Null Reference**

```csharp
public class ListExample
{
    public static void AddItemToList(List<string> items, string newItem)
    {
        items.Add(newItem);
    }

    public static void Main(string[] args)
    {
        List<string> items = null;
        AddItemToList(items, "Hello");
        Console.WriteLine(string.Join(", ", items));
    }
}
```

**Question:**
The code above is intended to add a new item to a list and then print the list. However, it throws a `NullReferenceException`. Identify and fix the issue.      

**Answer:**
The list `items` should be initialized before adding items to it.

```csharp
List<string> items = new List<string>();
```

### Topic: Basic Understanding of Generics (List<T>, Dictionary<TKey, TValue>)

**Question 3: Generic List Type Mismatch**

```csharp
public class GenericListExample
{
    public static void AddNumbers(List<int> numbers)
    {
        numbers.Add(10);
        numbers.Add(20);
    }

    public static void Main(string[] args)
    {
        List<string> numbers = new List<string>();
        AddNumbers(numbers);
        Console.WriteLine(string.Join(", ", numbers));
    }
}
```

**Question:**
The code above is intended to add integers to a list and then print the list. However, it throws a compile-time error. Identify and fix the issue.

**Answer:**
The `AddNumbers` method expects a `List<int>`, but a `List<string>` is passed. Change the list type to `List<int>`.

```csharp
List<int> numbers = new List<int>();
```

---

**Question 4: Dictionary Key Not Found**

```csharp
public class DictionaryExample
{
    public static void PrintValue(Dictionary<string, int> dictionary, string key)
    {
        Console.WriteLine("The value for the key '{0}' is: {1}", key, dictionary[key]);
    }

    public static void Main(string[] args)
    {
        Dictionary<string, int> dictionary = new Dictionary<string, int>
        {
            { "one", 1 },
            { "two", 2 },
            { "three", 3 }
        };

        PrintValue(dictionary, "four");
    }
}
```

**Question:**
The code above is intended to print the value for a given key from a dictionary. However, it throws a `KeyNotFoundException`. Identify and fix the issue.       

**Answer:**
Before accessing the dictionary, check if the key exists.

```csharp
public static void PrintValue(Dictionary<string, int> dictionary, string key)
{
    if (dictionary.ContainsKey(key))
    {
        Console.WriteLine("The value for the key '{0}' is: {1}", key, dictionary[key]);
    }
    else
    {
        Console.WriteLine("The key '{0}' was not found in the dictionary.", key);
    }
}
```

These questions should help interviewees demonstrate their debugging skills and understanding of collections and generics in C#.



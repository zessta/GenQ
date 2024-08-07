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

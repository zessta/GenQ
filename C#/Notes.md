###Scope of addition###


-Add Garbage Collection for C#
-Extension methods
-Threading(Concurrent connections)
-Design patterns in C#
-Delegates(Types of Delegates)
-Entity Framework - Navigational properties, use them instead of joins
-MSDN Doc


Here are 10 similar C# coding/debugging questions with answers focused on practical real-world scenarios:

---

### 1. **Garbage Collection – Memory Leak:**
   **Question:** Analyze the following code and identify any potential memory leaks. How would you fix the issue?

   ```csharp
   class ResourceHolder
   {
       private byte[] _data = new byte[1024 * 1024 * 10]; // 10 MB of data
       public static List<ResourceHolder> ResourceList = new List<ResourceHolder>();

       public void AddToList()
       {
           ResourceList.Add(this);
       }
   }
   ```

   **Answer:** The memory leak occurs because the `ResourceList` is holding a reference to each `ResourceHolder` instance. These objects will not be garbage collected because they remain in the list. The solution is to ensure that objects are removed from the list when they are no longer needed, or implement `IDisposable` to release resources when done.

---

### 2. **Garbage Collection – Circular References:**
   **Question:** In the code below, is there any risk of memory leaks? Why or why not?

   ```csharp
   class Parent
   {
       public Child child;
   }

   class Child
   {
       public Parent parent;
   }
   ```

   **Answer:** Circular references between managed objects do not cause memory leaks in C# because the garbage collector is smart enough to detect and clean up circular references. However, if these objects hold unmanaged resources (e.g., file handles), a memory leak could occur. Use `IDisposable` to properly manage unmanaged resources.

---

### 3. **Garbage Collection – Finalizers:**
   **Question:** Examine the following code. What issues can arise with the `Finalize` method, and how can you improve it?

   ```csharp
   class Resource
   {
       ~Resource()
       {
           // Cleanup code
       }
   }
   ```

   **Answer:** The use of a finalizer (`~Resource()`) can cause delays in memory cleanup because finalizers introduce additional overhead for garbage collection. You should implement the `IDisposable` pattern instead, allowing deterministic cleanup using `Dispose()`, and only include a finalizer if absolutely necessary for unmanaged resources.

---

### 4. **Garbage Collection – Large Objects:**
   **Question:** What is the issue with the following code, and how can you optimize it for garbage collection?

   ```csharp
   public void ProcessData()
   {
       byte[] largeData = new byte[1024 * 1024 * 100];  // 100 MB array
       // Process largeData
   }
   ```

   **Answer:** Large objects (greater than 85,000 bytes) are allocated on the large object heap (LOH), which is collected less frequently than the normal heap. This can lead to memory fragmentation. To optimize, consider breaking up large allocations or using a pooling strategy to reuse large arrays.

---

### 5. **Garbage Collection – Weak References:**
   **Question:** Debug the following code. Explain how you would use a `WeakReference` to avoid memory leaks.

   ```csharp
   class Cache
   {
       private Dictionary<string, object> _cache = new Dictionary<string, object>();

       public void AddItem(string key, object value)
       {
           _cache[key] = value;
       }
   }
   ```

   **Answer:** If the cached items are large or long-lived, they may prevent garbage collection and cause memory issues. To avoid this, use `WeakReference`:

   ```csharp
   _cache[key] = new WeakReference(value);
   ```

   This allows the garbage collector to collect objects if they are no longer in use elsewhere.

---

### 6. **Garbage Collection – Disposing Unmanaged Resources:**
   **Question:** What's wrong with this class? How would you manage unmanaged resources better?

   ```csharp
   class FileWrapper
   {
       private IntPtr _fileHandle;

       public FileWrapper(string path)
       {
           _fileHandle = OpenFile(path);
       }

       ~FileWrapper()
       {
           CloseFile(_fileHandle);
       }
   }
   ```

   **Answer:** Relying solely on the finalizer can lead to delayed resource cleanup. The correct approach is to implement `IDisposable` and explicitly call `Dispose()` to free unmanaged resources as soon as they are no longer needed:

   ```csharp
   public void Dispose()
   {
       CloseFile(_fileHandle);
       GC.SuppressFinalize(this);
   }
   ```

---

### 7. **Garbage Collection – Pinning Objects:**
   **Question:** What is the potential issue with the following code, and how can it affect garbage collection?

   ```csharp
   class PinnedObject
   {
       private GCHandle _handle;

       public PinnedObject(object obj)
       {
           _handle = GCHandle.Alloc(obj, GCHandleType.Pinned);
       }

       public void FreeHandle()
       {
           _handle.Free();
       }
   }
   ```

   **Answer:** Pinning an object prevents the garbage collector from moving it during collection, leading to memory fragmentation. Ensure that the pinned handle is freed as soon as possible to minimize its impact on garbage collection.

---

### 8. **Garbage Collection – Object Resurrection:**
   **Question:** What is object resurrection, and how does it cause issues in garbage collection? Can you identify a potential problem with the following code?

   ```csharp
   class Resource
   {
       ~Resource()
       {
           GC.ReRegisterForFinalize(this);
       }
   }
   ```

   **Answer:** Object resurrection occurs when an object is made reachable again in its finalizer, preventing the garbage collector from collecting it. This can lead to memory leaks and increased pressure on the garbage collector. Avoid calling `GC.ReRegisterForFinalize()` unless there is a specific need to resurrect the object.

---

### 9. **Garbage Collection – Event Handlers:**
   **Question:** Identify the issue in this event handling code and propose a fix for preventing memory leaks:

   ```csharp
   class Publisher
   {
       public event EventHandler MyEvent;
   }

   class Subscriber
   {
       public void Subscribe(Publisher publisher)
       {
           publisher.MyEvent += Handler;
       }

       public void Handler(object sender, EventArgs e)
       {
           // Handle event
       }
   }
   ```

   **Answer:** Event handlers can cause memory leaks if subscribers are not properly unsubscribed from events. Use weak event patterns, or explicitly unsubscribe in the subscriber’s `Dispose()` method:

   ```csharp
   publisher.MyEvent -= Handler;
   ```

---

### 10. **Garbage Collection – Static Fields:**
   **Question:** What potential memory issue arises with the following static field usage, and how would you correct it?

   ```csharp
   class DataStore
   {
       public static List<byte[]> Cache = new List<byte[]>();
   }
   ```

   **Answer:** Static fields persist for the lifetime of the application, preventing garbage collection of the stored data. This can lead to excessive memory consumption. Consider making the field non-static, or implement a strategy to periodically clear or limit the size of the cache.

---

These questions focus on identifying common garbage collection issues and require practical fixes, mirroring the challenges C# developers face in real-world projects.


Here are 10 coding/debugging questions for **extension methods** in C#, specifically using scenarios similar to the given example:

---

### 1. **Fixing LINQ Error in Extension Method:**
   **Question:** The following extension method attempts to sum the even numbers in a list but fails to compile. Debug and fix the issue.

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       return numbers.Select(n => n % 2 == 0).Sum();
   }
   ```

   **Answer:** The `.Select()` method needs to select the value of `n` when it is even, not a boolean result. The corrected version should use `.Where()` to filter out the even numbers before summing:

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       return numbers.Where(n => n % 2 == 0).Sum();
   }
   ```

---

### 2. **Returning Nullable Types:**
   **Question:** Modify the extension method to return `null` if the list is empty. Debug the method to ensure it works as intended.

   ```csharp
   public static int? SumEven(this List<int> numbers)
   {
       return numbers.Count > 0 ? numbers.Where(n => n % 2 == 0).Sum() : null;
   }
   ```

   **Answer:** The issue is that `.Sum()` returns 0 for empty collections, so you need to check if any even numbers exist before returning the sum:

   ```csharp
   public static int? SumEven(this List<int> numbers)
   {
       var evens = numbers.Where(n => n % 2 == 0);
       return evens.Any() ? evens.Sum() : (int?)null;
   }
   ```

---

### 3. **Handling Null Lists:**
   **Question:** The current extension method throws a `NullReferenceException` if `numbers` is `null`. Add proper null handling to avoid this issue.

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       return numbers?.Where(n => n % 2 == 0).Sum() ?? 0;
   }
   ```

   **Answer:** The fix involves checking if `numbers` is `null` and returning 0 in that case, ensuring no exception is thrown:

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       return numbers?.Where(n => n % 2 == 0).Sum() ?? 0;
   }
   ```

---

### 4. **Optimizing for Performance:**
   **Question:** Modify the method to improve performance when working with very large lists. Assume the list is large and the numbers are sparsely even.

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       int sum = 0;
       foreach (var number in numbers)
       {
           if (number % 2 == 0)
               sum += number;
       }
       return sum;
   }
   ```

   **Answer:** This approach improves performance by avoiding multiple iterations or unnecessary LINQ overhead for large lists. The direct loop is faster for large datasets.

---

### 5. **Extending Multiple Types:**
   **Question:** Create a more generic extension method that sums even numbers for any collection of integers (e.g., `IEnumerable<int>`). Debug any issues in the code below.

   ```csharp
   public static int SumEven<T>(this IEnumerable<T> numbers)
   {
       return numbers.Where(n => n % 2 == 0).Sum();
   }
   ```

   **Answer:** The issue here is that the generic type `T` does not support arithmetic operations. The method should not be generic:

   ```csharp
   public static int SumEven(this IEnumerable<int> numbers)
   {
       return numbers.Where(n => n % 2 == 0).Sum();
   }
   ```

---

### 6. **Avoiding State Modification:**
   **Question:** Modify the method to ensure that it does not modify the original `List<int>` while summing even numbers. Debug the code to ensure it works correctly.

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       for (int i = 0; i < numbers.Count; i++)
       {
           if (numbers[i] % 2 != 0)
               numbers.RemoveAt(i);
       }
       return numbers.Sum();
   }
   ```

   **Answer:** The method modifies the original list by removing odd numbers, which is not ideal. Instead, use `.Where()` to avoid modifying the list:

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       return numbers.Where(n => n % 2 == 0).Sum();
   }
   ```

---

### 7. **Adding Logging for Debugging:**
   **Question:** Add logging to the method to output each even number found. Ensure that the method is correctly summing the even numbers.

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       int sum = 0;
       foreach (var number in numbers)
       {
           if (number % 2 == 0)
           {
               Console.WriteLine($"Adding: {number}");
               sum += number;
           }
       }
       return sum;
   }
   ```

   **Answer:** This version adds logging to help debug the process. Each even number is printed before being added to the sum.

---

### 8. **Thread-Safety in Extension Methods:**
   **Question:** Modify the extension method to be thread-safe when accessed by multiple threads. Debug any issues that may arise from concurrent access.

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       int sum = 0;
       Parallel.ForEach(numbers, number =>
       {
           if (number % 2 == 0)
           {
               sum += number;
           }
       });
       return sum;
   }
   ```

   **Answer:** The issue here is that `sum` is being modified by multiple threads simultaneously, which leads to race conditions. Use a thread-safe method to update the sum:

   ```csharp
   public static int SumEven(this List<int> numbers)
   {
       int sum = 0;
       object lockObj = new object();
       Parallel.ForEach(numbers, number =>
       {
           if (number % 2 == 0)
           {
               lock (lockObj)
               {
                   sum += number;
               }
           }
       });
       return sum;
   }
   ```

---

### 9. **Extension Method on Nullables:**
   **Question:** Modify the extension method to handle a `List<int?>` where some integers may be `null`. Debug the method to ensure correct behavior.

   ```csharp
   public static int SumEven(this List<int?> numbers)
   {
       return numbers.Where(n => n.HasValue && n.Value % 2 == 0).Sum(n => n.Value);
   }
   ```

   **Answer:** The method correctly handles nullable integers by checking for a value before performing arithmetic.

---

### 10. **Chaining Extension Methods:**
   **Question:** Implement another extension method `Square` that squares each integer in the list. Chain this method with `SumEven` and debug any issues.

   ```csharp
   public static List<int> Square(this List<int> numbers)
   {
       return numbers.Select(n => n * n).ToList();
   }

   public static int SumEvenSquares(this List<int> numbers)
   {
       return numbers.Square().SumEven();
   }
   ```

   **Answer:** The method chains `Square` and `SumEven`, allowing operations to be combined. This approach encourages reusable and composable extension methods.

---

These questions test practical knowledge of debugging and implementing extension methods in C#. Each scenario helps to understand how to handle edge cases, performance concerns, thread safety, and extension method chaining.

Here are 10 coding debugging questions based on **Design Patterns**, similar to the provided Singleton example:

---

### 1. **Singleton Pattern – Thread Safety:**
   **Question:** Identify and fix the issue in the Singleton pattern implementation below to make it thread-safe.

   ```csharp
   public class Singleton
   {
       private static Singleton _instance;
       private static readonly object _lock = new object();

       private Singleton() { }

       public static Singleton GetInstance()
       {
           lock (_lock)
           {
               if (_instance == null)
               {
                   _instance = new Singleton();
               }
           }
           return _instance;
       }
   }
   ```

   **Answer:** The `lock` statement ensures that only one thread can enter the critical section at a time, making the Singleton implementation thread-safe.

---

### 2. **Factory Pattern – Incorrect Object Creation:**
   **Question:** The following factory pattern implementation is supposed to create different shapes. However, the code always returns a `Circle`. Debug and fix the issue.

   ```csharp
   public class ShapeFactory
   {
       public Shape CreateShape(string type)
       {
           if (type == "Circle")
               return new Circle();
           else if (type == "Square")
               return new Circle();
           else
               return null;
       }
   }
   ```

   **Answer:** The issue is in the second `else if` block, which mistakenly returns a `Circle` instead of a `Square`. Correct the code:

   ```csharp
   else if (type == "Square")
       return new Square();
   ```

---

### 3. **Observer Pattern – Missing Notifications:**
   **Question:** In the Observer pattern below, observers are not getting notified of changes. Identify the issue and debug it.

   ```csharp
   public class Subject
   {
       private List<IObserver> observers = new List<IObserver>();

       public void RegisterObserver(IObserver observer)
       {
           observers.Add(observer);
       }

       public void NotifyObservers()
       {
           foreach (var observer in observers)
           {
               observer.Update();
           }
       }
   }
   ```

   **Answer:** The issue may occur if `NotifyObservers()` is not being called after state changes in the `Subject`. Ensure that `NotifyObservers()` is called whenever the state changes.

---

### 4. **Decorator Pattern – Incorrect Decoration:**
   **Question:** The following decorator pattern code does not apply the correct decorators in sequence. Debug and fix the issue.

   ```csharp
   public interface ICoffee
   {
       string GetDescription();
       double GetCost();
   }

   public class Espresso : ICoffee
   {
       public string GetDescription() => "Espresso";
       public double GetCost() => 5.0;
   }

   public class MilkDecorator : ICoffee
   {
       private ICoffee _coffee;
       public MilkDecorator(ICoffee coffee) { _coffee = coffee; }

       public string GetDescription() => _coffee.GetDescription() + ", Milk";
       public double GetCost() => _coffee.GetCost() + 1.0;
   }
   ```

   **Answer:** Ensure that the decorators are applied in the correct order. For instance:

   ```csharp
   ICoffee coffee = new MilkDecorator(new Espresso());
   ```

   This way, the decorator wraps the `Espresso` correctly.

---

### 5. **Strategy Pattern – Incorrect Strategy Execution:**
   **Question:** The following code implements a strategy pattern, but the chosen strategy is not executing correctly. Identify and fix the issue.

   ```csharp
   public interface IStrategy
   {
       void Execute();
   }

   public class StrategyA : IStrategy
   {
       public void Execute() => Console.WriteLine("Executing Strategy A");
   }

   public class StrategyB : IStrategy
   {
       public void Execute() => Console.WriteLine("Executing Strategy B");
   }

   public class Context
   {
       private IStrategy _strategy;

       public void SetStrategy(IStrategy strategy)
       {
           _strategy = strategy;
       }

       public void ExecuteStrategy()
       {
           _strategy.Execute();
       }
   }
   ```

   **Answer:** The issue occurs if the strategy is not set before calling `ExecuteStrategy()`. Ensure that `SetStrategy()` is called before execution:

   ```csharp
   Context context = new Context();
   context.SetStrategy(new StrategyA());
   context.ExecuteStrategy();
   ```

---

### 6. **Adapter Pattern – Incorrect Adaptation:**
   **Question:** The Adapter pattern below is supposed to adapt a `Rectangle` to behave like a `Square`, but the adaptation is incorrect. Debug and fix the issue.

   ```csharp
   public class Square
   {
       public int Side { get; set; }
   }

   public class Rectangle
   {
       public int Width { get; set; }
       public int Height { get; set; }
   }

   public class SquareToRectangleAdapter : Square
   {
       private Rectangle _rectangle;

       public SquareToRectangleAdapter(Rectangle rectangle)
       {
           _rectangle = rectangle;
       }

       public int GetSide()
       {
           return _rectangle.Width;
       }
   }
   ```

   **Answer:** Ensure that both `Width` and `Height` of the `Rectangle` are equal for it to behave as a `Square`. Add checks to ensure the sides match before adapting.

---

### 7. **Command Pattern – Command Not Executing:**
   **Question:** In the following Command pattern implementation, the command is created but does not execute. Identify the issue and fix it.

   ```csharp
   public interface ICommand
   {
       void Execute();
   }

   public class LightOnCommand : ICommand
   {
       public void Execute() => Console.WriteLine("Light is ON");
   }

   public class RemoteControl
   {
       private ICommand _command;

       public void SetCommand(ICommand command)
       {
           _command = command;
       }

       public void PressButton()
       {
           _command.Execute();
       }
   }
   ```

   **Answer:** Ensure that the command is set before calling `PressButton()`:

   ```csharp
   RemoteControl remote = new RemoteControl();
   remote.SetCommand(new LightOnCommand());
   remote.PressButton();
   ```

---

### 8. **Builder Pattern – Incomplete Build:**
   **Question:** The builder pattern below does not correctly build the object. Debug and ensure the object is fully constructed.

   ```csharp
   public class Car
   {
       public string Engine { get; set; }
       public string Wheels { get; set; }
   }

   public class CarBuilder
   {
       private Car _car = new Car();

       public void BuildEngine() { _car.Engine = "V8"; }
       public void BuildWheels() { _car.Wheels = "Alloy"; }

       public Car GetCar() { return _car; }
   }
   ```

   **Answer:** Ensure that both `BuildEngine()` and `BuildWheels()` are called before retrieving the car:

   ```csharp
   CarBuilder builder = new CarBuilder();
   builder.BuildEngine();
   builder.BuildWheels();
   Car car = builder.GetCar();
   ```

---

### 9. **Prototype Pattern – Deep vs. Shallow Copy:**
   **Question:** In the Prototype pattern below, modifying the clone also modifies the original. Implement a deep copy to avoid this issue.

   ```csharp
   public class Prototype
   {
       public int[] Data { get; set; }

       public Prototype Clone()
       {
           return (Prototype)this.MemberwiseClone();
       }
   }
   ```

   **Answer:** Implement a deep copy by creating a new array for the `Data` property:

   ```csharp
   public Prototype Clone()
   {
       return new Prototype { Data = (int[])Data.Clone() };
   }
   ```

---

### 10. **Mediator Pattern – Improper Message Dispatch:**
   **Question:** In the Mediator pattern below, messages are not reaching all participants. Debug and fix the issue.

   ```csharp
   public class Mediator
   {
       private List<IParticipant> participants = new List<IParticipant>();

       public void Register(IParticipant participant)
       {
           participants.Add(participant);
       }

       public void SendMessage(string message, IParticipant sender)
       {
           foreach (var participant in participants)
           {
               if (participant != sender)
                   participant.Receive(message);
           }
       }
   }
   ```

   **Answer:** Ensure that all participants are correctly registered and that the sender is excluded from receiving the message. Add checks for proper message dispatching.

---

These questions challenge the candidate's understanding of design patterns in C# and their ability to debug and refactor real-world pattern implementations.

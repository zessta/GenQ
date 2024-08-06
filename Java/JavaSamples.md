### Trees (Binary Tree, Binary Search Tree, AVL Tree)

**Question 1: Binary Search Tree (BST) Insertion**

You are given the following Java code to insert a node into a Binary Search Tree (BST). However, it is not working as expected. Identify and fix the error(s) in the code.

```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) {
        this.val = val;
        this.left = this.right = null;
    }
}

public class BST {
    TreeNode root;

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private TreeNode insertRec(TreeNode root, int val) {
        if (root == null) {
            root = new TreeNode(val);
            return root;
        }
        if (val < root.val) {
            root.left = insertRec(root.left, val);
        } else if (val > root.val) {
            root.right = insertRec(root.right, val);
        }
        return root;
    }

    public static void main(String[] args) {
        BST bst = new BST();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(5); // Duplicate value insertion
    }
}
```

**Hint:** Consider how the code handles duplicate values.

**Answer:**
```java
public void insert(int val) {
    root = insertRec(root, val);
}

private TreeNode insertRec(TreeNode root, int val) {
    if (root == null) {
        root = new TreeNode(val);
        return root;
    }
    if (val < root.val) {
        root.left = insertRec(root.left, val);
    } else if (val > root.val) {
        root.right = insertRec(root.right, val);
    } else {
        // Handle duplicate values (optional)
        System.out.println("Value " + val + " already exists in the BST.");
    }
    return root;
}
```

### Graphs (Adjacency List, Adjacency Matrix)

**Question 2: Graph Representation using Adjacency List**

The following code is intended to add an edge to an undirected graph using an adjacency list. However, it does not produce the correct graph structure. Identify and fix the error(s).

```java
import java.util.*;

class Graph {
    private int V;
    private LinkedList<Integer> adjListArray[];

    Graph(int V) {
        this.V = V;
        adjListArray = new LinkedList[V];
        for (int i = 0; i < V; i++) {
            adjListArray[i] = new LinkedList<>();
        }
    }

    void addEdge(int src, int dest) {
        adjListArray[src].add(dest);
    }

    void printGraph() {
        for (int v = 0; v < V; v++) {
            System.out.print("Adjacency list of vertex " + v + ":");
            for (Integer node : adjListArray[v]) {
                System.out.print(" -> " + node);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Graph graph = new Graph(5);
        graph.addEdge(0, 1);
        graph.addEdge(0, 4);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);

        graph.printGraph();
    }
}
```

**Hint:** Consider whether the graph is undirected and how edges should be added.

**Answer:**
```java
void addEdge(int src, int dest) {
    adjListArray[src].add(dest);
    adjListArray[dest].add(src); // Add this line to handle undirected graph
}
```

### Heaps (Min-Heap, Max-Heap)

**Question 3: Min-Heap Insertion**

The following code is supposed to insert a new element into a Min-Heap. However, it fails to maintain the heap property. Identify and fix the error(s).        

```java
import java.util.*;

class MinHeap {
    private ArrayList<Integer> heap;

    MinHeap() {
        heap = new ArrayList<>();
    }

    void insert(int val) {
        heap.add(val);
        int i = heap.size() - 1;
        while (i > 0 && heap.get(parent(i)) > heap.get(i)) {
            Collections.swap(heap, i, parent(i));
            i = parent(i);
        }
    }

    private int parent(int i) {
        return (i - 1) / 2;
    }

    void printHeap() {
        for (int i : heap) {
            System.out.print(i + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MinHeap minHeap = new MinHeap();
        minHeap.insert(3);
        minHeap.insert(2);
        minHeap.insert(1);
        minHeap.insert(7);
        minHeap.insert(8);
        minHeap.insert(4);
        minHeap.insert(10);
        minHeap.insert(16);
        minHeap.insert(12);
        minHeap.printHeap();
    }
}
```

**Hint:** Ensure that the heap property is maintained after each insertion.

**Answer:**
The code provided is actually correct and maintains the Min-Heap property. No changes are needed.

### Tries

**Question 4: Trie Insertion**

The following code is intended to insert a word into a Trie. However, it is not functioning as expected. Identify and fix the error(s).

```java
class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord;
}

class Trie {
    private TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
        }
        node.isEndOfWord = true;
    }

    boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                return false;
            }
            node = node.children[index];
        }
        return node.isEndOfWord;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("hello");
        trie.insert("world");

        System.out.println(trie.search("hello")); // true
        System.out.println(trie.search("hell"));  // false
        System.out.println(trie.search("world")); // true
        System.out.println(trie.search("word"));  // false
    }
}
```

**Hint:** Ensure that the Trie correctly handles all characters in the word.

**Answer:**
The code provided is actually correct and inserts words into the Trie as expected. No changes are needed.

These questions cover debugging scenarios for advanced data structures in Java, which are commonly encountered in job interviews.









### Networking

#### 1. Sockets and ServerSocket

**Question:**
You have been given a simple Java server-client application using `ServerSocket` and `Socket`. The server should accept connections from multiple clients and respond with a welcome message. However, the current implementation only accepts one client and then stops.

```java
// Server.java
import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(12345)) {
            System.out.println("Server is listening on port 12345");
            Socket socket = serverSocket.accept();
            System.out.println("New client connected");

            OutputStream output = socket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);
            writer.println("Welcome to the server!");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}

// Client.java
import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) {
        String hostname = "localhost";
        int port = 12345;

        try (Socket socket = new Socket(hostname, port)) {
            InputStream input = socket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));
            String message = reader.readLine();
            System.out.println("Server: " + message);
        } catch (UnknownHostException ex) {
            System.out.println("Server not found: " + ex.getMessage());
        } catch (IOException ex) {
            System.out.println("I/O error: " + ex.getMessage());
        }
    }
}
```

**Task:**
Refactor the `Server.java` code so that it can handle multiple clients concurrently.

**Answer:**
The server needs to handle each client connection in a separate thread.

```java
// Server.java
import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(12345)) {
            System.out.println("Server is listening on port 12345");
            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("New client connected");
                new ClientHandler(socket).start();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}

class ClientHandler extends Thread {
    private Socket socket;

    public ClientHandler(Socket socket) {
        this.socket = socket;
    }

    public void run() {
        try {
            OutputStream output = socket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);
            writer.println("Welcome to the server!");
            socket.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
```

#### 2. HTTP Communication

**Question:**
The following Java code is intended to send a GET request to a specified URL and print the response. However, it throws an exception and fails to print the response.

```java
import java.io.*;
import java.net.*;

public class HttpGetExample {
    public static void main(String[] args) {
        String urlString = "http://www.example.com";

        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            connection.disconnect();

            System.out.println(content.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Task:**
Identify and fix the issue so that the code successfully sends a GET request and prints the response.

**Answer:**
The issue is that the `HttpURLConnection` object needs to connect to the URL before trying to read the response.

```java
import java.io.*;
import java.net.*;

public class HttpGetExample {
    public static void main(String[] args) {
        String urlString = "http://www.example.com";

        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();  // Added this line

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            connection.disconnect();

            System.out.println(content.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 3. RESTful Services

**Question:**
You are given a simple RESTful web service implemented using Spring Boot. The service is supposed to return a list of users in JSON format. However, when you run the service and hit the endpoint, you get a `404 Not Found` error.

```java
// UserController.java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class UserController {

    @GetMapping("/users")
    public List<String> getUsers() {
        return Arrays.asList("User1", "User2", "User3");
    }
}

// DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**Task:**
Identify and fix the issue so that the `/users` endpoint returns the list of users.

**Answer:**
The `UserController` class must be in a package that is scanned by Spring Boot. Ensure that the `UserController` class is in a sub-package of the main application class package.

```java
// UserController.java
package com.example.demo.controller;  // Changed the package to be a sub-package of the main application package

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class UserController {

    @GetMapping("/users")
    public List<String> getUsers() {
        return Arrays.asList("User1", "User2", "User3");
    }
}

// DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

By moving the `UserController` class to a sub-package of the main application package, Spring Boot will scan and register the controller, allowing the `/users` endpoint to work correctly.

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


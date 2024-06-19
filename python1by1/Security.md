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

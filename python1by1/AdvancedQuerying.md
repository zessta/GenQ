Question 11

#### 0 - Topics
- Flask-SQLAlchemy Advanced Querying
- SQL Injection Prevention

#### 1 - Scenario
You are developing an application with Flask-SQLAlchemy and want to ensure your query methods are safe from SQL injection attacks.

#### 2 - Code
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.route('/user/<username>')
def get_user(username):
    user = db.engine.execute(f"SELECT * FROM user WHERE username = '{username}'").fetchone()
    if user:
        return jsonify(username=user['username'], email=user['email'])
    return 'User not found', 404

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the SQL query implementation in the above code.

#### 4 - Explanation
The code uses raw SQL with string interpolation, making it vulnerable to SQL injection attacks. The query should use parameterized queries to prevent SQL injection.

#### 5 - Answer
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.route('/user/<username>')
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify(username=user.username, email=user.email)
    return 'User not found', 404

if __name__ == '__main__':
    app.run()
```

---

These additional questions cover advanced concepts like OAuth2 authentication, custom error handling, asynchronous email sending, and SQL injection prevention. These should challenge even senior developers and test their deep understanding of Flask and associated libraries.

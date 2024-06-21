Question 2

#### 0 - Topics
- SQLAlchemy for Database Management
- Handling Database Migrations

#### 1 - Scenario
You are developing a web application using Flask with SQLAlchemy for database interactions. You want to ensure the database schema evolves smoothly using Flask-Migrate for migrations.

#### 2 - Code
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
The above code does not handle database migrations properly. Identify and explain the issue in the code.

#### 4 - Explanation
The problem is that the `Migrate` instance is not being properly integrated with Flask-Migrate's CLI commands. This setup will not allow you to run migration commands from the command line.

#### 5 - Answer
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

@app.cli.command()
def deploy():
    """Run deployment tasks."""
    # Run migration scripts
    upgrade()

if __name__ == '__main__':
    app.run()
```

---

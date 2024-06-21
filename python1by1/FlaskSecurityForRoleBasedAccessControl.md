Question 5

#### 0 - Topics
- Flask-Security for Role-Based Access Control
- Handling User Authentication and Authorization

#### 1 - Scenario
You are creating a web application that requires user authentication and role-based access control. You decide to use Flask-Security for managing users and roles.

#### 2 - Code
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required, roles_required

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///security.db'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'salty'

db = SQLAlchemy(app)

roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

@app.route('/admin')
@roles_required('admin')
def admin_page():
    return 'Welcome to the admin page!'

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
There is an issue with the role-based access control implementation in the above code. Identify and explain the issue.

#### 4 - Explanation
The code does not initialize the database with the necessary user and role data. Without creating roles and users, the access control checks will fail because no user will have the 'admin' role.

#### 5 - Answer
```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required, roles_required
from flask_security.utils import encrypt_password

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///security.db'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'salty'

db = SQLAlchemy(app)

roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

@app.before_first_request
def create_user():
    db.create_all()
    if not user_datastore.find_role('admin'):
        user_datastore.create_role(name='admin')
    if not user_datastore.get_user('admin@example.com'):
        user_datastore.create_user(email='admin@example.com', password=encrypt_password('password'), roles=['admin'])
    db.session.commit()

@app.route('/admin')
@roles_required('admin')
def admin_page():
    return 'Welcome to the admin page!'

if __name__ == '__main__':
    app.run()
```

---

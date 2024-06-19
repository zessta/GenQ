Question 12


#### 0 - Topics
- Flask-Login for User Authentication
- Session Management

#### 1 - Scenario
You are building an application that requires user authentication using Flask-Login. You need to manage user sessions correctly and securely.

#### 2 - Code
```python
from flask import Flask, render_template, redirect, url_for, request
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

users = {1: User(1, 'user1')}

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        user = next((u for u in users.values() if u.username == username), None)
        if user:
            login_user(user)
            return redirect(url_for('protected'))
        return 'Invalid credentials'
    return render_template('login.html')

@app.route('/protected')
@login_required
def protected():
    return f'Logged in as: {current_user.username}'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the user authentication and session management in the above code.

#### 4 - Explanation
The code does not properly handle the case where the user is already logged in and tries to access the login page. Additionally, it lacks proper session protection and security measures such as `remember_me` functionality.

#### 5 - Answer
```python
from flask import Flask, render_template, redirect, url_for, request
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

users = {1: User(1, 'user1')}

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('protected'))
    if request.method == 'POST':
        username = request.form['username']
        user = next((u for u in users.values() if u.username == username), None)
        if user:
            login_user(user, remember=True)
            return redirect(url_for('protected'))
        return 'Invalid credentials'
    return render_template('login.html')

@app.route('/protected')
@login_required
def protected():
    return f'Logged in as: {current_user.username}'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run()
```

---


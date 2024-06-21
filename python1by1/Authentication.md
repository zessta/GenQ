Question 8

#### 0 - Topics
- OAuth2 Authentication with Flask-Dance
- External API Integration

#### 1 - Scenario
You are building a Flask application that requires OAuth2 authentication to allow users to log in with their Google accounts. You decide to use Flask-Dance for this purpose and need to integrate it properly.

#### 2 - Code
```python
from flask import Flask, redirect, url_for
from flask_dance.contrib.google import make_google_blueprint, google

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

google_bp = make_google_blueprint(client_id='my-client-id', client_secret='my-client-secret', redirect_to='google_login')
app.register_blueprint(google_bp, url_prefix='/login')

@app.route('/')
def index():
    return 'Welcome to the Flask app!'

@app.route('/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get('/plus/v1/people/me')
    assert resp.ok, resp.text
    return 'You are connected as {0}'.format(resp.json()['displayName'])

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the OAuth2 authentication implementation in the above code.

#### 4 - Explanation
The code does not handle storing the OAuth token securely or checking for errors during the OAuth flow. Additionally, the redirect URL configuration might be incorrect, and error handling for the Google API response is missing.

#### 5 - Answer
```python
from flask import Flask, redirect, url_for, session
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.consumer.storage.sqla import SQLAlchemyStorage
from flask_sqlalchemy import SQLAlchemy
from flask_dance.consumer import oauth_authorized

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///oauth.db'

db = SQLAlchemy(app)

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

google_bp = make_google_blueprint(client_id='my-client-id', client_secret='my-client-secret', storage=SQLAlchemyStorage(OAuth, db.session, user=current_user))
app.register_blueprint(google_bp, url_prefix='/login')

@app.route('/')
def index():
    return 'Welcome to the Flask app!'

@app.route('/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get('/plus/v1/people/me')
    if not resp.ok:
        return 'Failed to fetch user info', 400
    return 'You are connected as {0}'.format(resp.json()['displayName'])

@oauth_authorized.connect_via(google_bp)
def google_logged_in(blueprint, token):
    # Store the token securely
    session['google_token'] = token

if __name__ == '__main__':
    app.run()
```

---


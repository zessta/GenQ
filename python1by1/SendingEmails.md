Question 10

#### 0 - Topics
- Flask-Mail for Sending Emails
- Asynchronous Email Sending

#### 1 - Scenario
You are building a Flask application that needs to send email notifications. You want to use Flask-Mail and send the emails asynchronously to avoid blocking the main application thread.

#### 2 - Code
```python
from flask import Flask, render_template
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@example.com'
app.config['MAIL_PASSWORD'] = 'your-password'

mail = Mail(app)

@app.route('/send-email')
def send_email():
    msg = Message('Hello', sender='your-email@example.com', recipients=['recipient@example.com'])
    msg.body = 'This is a test email'
    mail.send(msg)
    return 'Email sent!'

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the email sending implementation in the above code.

#### 4 - Explanation
The code sends the email synchronously, which can block the main thread if the email server is slow or unresponsive. It should send emails asynchronously to improve performance and user experience.

#### 5 - Answer
```python
from flask import Flask, render_template
from flask_mail import Mail, Message
from threading import Thread

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@example.com'
app.config['MAIL_PASSWORD'] = 'your-password'

mail = Mail(app)

def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

@app.route('/send-email')
def send_email():
    msg = Message('Hello', sender='your-email@example.com', recipients=['recipient@example.com'])
    msg.body = 'This is a test email'
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return 'Email sent!'

if __name__ == '__main__':
    app.run()
```

---

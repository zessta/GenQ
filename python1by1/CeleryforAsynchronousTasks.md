Question 3

#### 0 - Topics
- Celery for Asynchronous Tasks
- Redis Queues

#### 1 - Scenario
You are building a web application where some tasks need to be processed asynchronously to avoid blocking the main application thread. You decide to use Celery with Redis as the message broker.

#### 2 - Code
```python
from flask import Flask
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

def make_celery(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    return celery

celery = make_celery(app)

@celery.task
def add_together(a, b):
    return a + b

@app.route('/add/<int:a>/<int:b>')
def add(a, b):
    result = add_together.delay(a, b)
    return f'Task result: {result.get()}'

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
There is an issue with the asynchronous task processing in the above code. Identify and explain the issue.

#### 4 - Explanation
The problem is with the call to `result.get()` inside the route handler. This call will block the main thread until the task completes, defeating the purpose of using Celery for asynchronous task processing.

#### 5 - Answer
```python
from flask import Flask, jsonify
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

def make_celery(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    return celery

celery = make_celery(app)

@celery.task
def add_together(a, b):
    return a + b

@app.route('/add/<int:a>/<int:b>')
def add(a, b):
    result = add_together.delay(a, b)
    return jsonify({'task_id': result.id})

@app.route('/result/<task_id>')
def result(task_id):
    task = add_together.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {'state': task.state, 'status': 'Pending...'}
    elif task.state != 'FAILURE':
        response = {'state': task.state, 'result': task.result}
    else:
        response = {'state': task.state, 'status': str(task.info)}

    return jsonify(response)

if __name__ == '__main__':
    app.run()
```

In this corrected version, the `add` route initiates the task and returns a task ID, while a new `result` route allows clients to check the status of the task asynchronously.


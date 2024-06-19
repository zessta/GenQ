Question 9

#### 0 - Topics
- Flask-RESTful Advanced Features
- Custom Error Handling

#### 1 - Scenario
You are developing a RESTful API with Flask-RESTful and want to implement custom error handling for your endpoints.

#### 2 - Code
```python
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class CustomError(Exception):
    pass

class HelloWorld(Resource):
    def get(self):
        if 'error' in request.args:
            raise CustomError('This is a custom error')
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()
```

#### 3 - Question
Identify and explain the issues with the custom error handling implementation in the above code.

#### 4 - Explanation
The code does not include an error handler for the custom error, which means Flask will not know how to handle it, resulting in a generic 500 Internal Server Error response. Custom error handlers should be registered to handle specific exceptions.

#### 5 - Answer
```python
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
api = Api(app)

class CustomError(Exception):
    pass

@app.errorhandler(CustomError)
def handle_custom_error(error):
    response = jsonify({'message': str(error)})
    response.status_code = 400
    return response

class HelloWorld(Resource):
    def get(self):
        if 'error' in request.args:
            raise CustomError('This is a custom error')
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()
```

---

Question 6

0 - Topics
- Django Middleware
- Request/Response Processing
- Error Handling and Logging

1 - Scenario
A company uses custom middleware to log every request and response. They noticed that some requests and responses are not being logged, especially those that result in an error. The developer needs to ensure all requests and responses, including those leading to errors, are logged.

2 - Code
```python
import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logger.info(f"Request: {request.method} {request.get_full_path()}")

    def process_response(self, request, response):
        logger.info(f"Response: {response.status_code}")
        return response

# Add middleware in settings
MIDDLEWARE = [
    # Other middlewares
    'myapp.middleware.LoggingMiddleware',
]

# settings.py for logger configuration
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
```

3 - Question
Some requests and responses, particularly those resulting in errors, are not being logged. Identify and explain the issue in the code.

4 - Explanation
The current implementation only logs successful responses. If an error occurs during request processing, the `process_response` method is not called, resulting in missed logs for those requests.

5 - Answer
```python
import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        logger.info(f"Request: {request.method} {request.get_full_path()}")

    def process_response(self, request, response):
        logger.info(f"Response: {response.status_code}")
        return response

    def process_exception(self, request, exception):
        logger.error(f"Exception: {exception}")
        return None  # Allows other middleware to handle the exception

# Add middleware in settings
MIDDLEWARE = [
    # Other middlewares
    'myapp.middleware.LoggingMiddleware',
]

# settings.py for logger configuration
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
```
In this corrected version, the `process_exception` method is added to the middleware to log exceptions. This ensures that requests resulting in errors are also logged.

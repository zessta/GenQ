Question 12

0 - Topics
- Django Middleware
- Security
- Cross-Site Request Forgery (CSRF) Protection

1 - Scenario
A Django application uses custom middleware to log user actions. However, users are reporting that certain actions are being rejected with CSRF errors, even though CSRF protection is enabled.

2 - Code
```python
import logging
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import CsrfViewMiddleware

logger = logging.getLogger(__name__)

class ActionLoggingMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            logger.info(f"User {user.username} accessed {request.path}")

# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'myapp.middleware.ActionLoggingMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Sample view
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def protected_view(request):
    if request.method == 'POST':
        # Process the form
        pass
    return render(request, 'protected_view.html')
```

3 - Question
Certain

 actions are being rejected with CSRF errors. Identify and explain the issue in the code.

4 - Explanation
The custom middleware `ActionLoggingMiddleware` is placed after `CsrfViewMiddleware` in the middleware order. If `ActionLoggingMiddleware` modifies the request in any way that affects CSRF token validation, it can cause CSRF errors.

5 - Answer
```python
import logging
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import CsrfViewMiddleware

logger = logging.getLogger(__name__)

class ActionLoggingMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            logger.info(f"User {user.username} accessed {request.path}")

# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'myapp.middleware.ActionLoggingMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Sample view
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def protected_view(request):
    if request.method == 'POST':
        # Process the form
        pass
    return render(request, 'protected_view.html')
```
In the corrected version, the `ActionLoggingMiddleware` is placed before `CsrfViewMiddleware` to ensure that any logging does not interfere with CSRF token validation.

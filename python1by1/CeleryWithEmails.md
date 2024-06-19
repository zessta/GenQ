Question 13

0 - Topics
- Django Celery
- Asynchronous Task Queues
- Error Handling in Celery Tasks

1 - Scenario
A Django application uses Celery to handle background tasks such as sending emails. The developer noticed that some tasks fail silently without any indication of an error, causing important emails to be missed.

2 - Code
```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_email_task(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)

# views.py
from myapp.tasks import send_email_task

def send_welcome_email(request):
    send_email_task.delay(
        'Welcome!',
        'Thank you for signing up.',
        'from@example.com',
        [request.user.email]
    )
    return render(request, 'email_sent.html')

# celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
```

3 - Question
Some Celery tasks fail silently without any indication of an error. Identify and explain the issue in the code.

4 - Explanation
The Celery task does not include any error handling or logging, so if an exception occurs (e.g., email sending fails), it fails silently. This makes it difficult to debug and understand why tasks are failing.

5 - Answer
```python
# tasks.py
from celery import shared_task
from django.core.mail import send_mail
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True)
def send_email_task(self, subject, message, from_email, recipient_list):
    try:
        send_mail(subject, message, from_email, recipient_list)
    except Exception as exc:
        logger.error(f"Error sending email: {exc}")
        self.retry(exc=exc, countdown=60, max_retries=3)

# views.py
from myapp.tasks import send_email_task

def send_welcome_email(request):
    send_email_task.delay(
        'Welcome!',
        'Thank you for signing up.',
        'from@example.com',
        [request.user.email]
    )
    return render(request, 'email_sent.html')

# celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
```
In the corrected version, error handling and logging are added to the Celery task. If an exception occurs, it is logged, and the task retries up to three times with a delay, providing better error tracking and handling.

Question 9

0 - Topics
- Django ORM
- Migrations
- Data Consistency

1 - Scenario
A Django application manages events and attendees. The developer recently added a new field to track the date when an attendee registered for an event. However, after deploying the changes, users are reporting errors when registering for events.

2 - Code
```python
from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=100)
    event_date = models.DateTimeField()

class Attendee(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    registered_date = models.DateTimeField(auto_now_add=True)

# View to handle attendee registration
def register_attendee(request, event_id):
    event = Event.objects.get(id=event_id)
    name = request.POST.get('name')
    email = request.POST.get('email')
    attendee = Attendee(event=event, name=name, email=email)
    attendee.save()
    return render(request, 'registration_success.html', {'attendee': attendee})
```

3 - Question
Users are reporting errors when registering for events after the new field was added. Identify and explain the issue in the code.

4 - Explanation
The issue likely arises from not running the database migrations after adding the new field to the `Attendee` model. This means the database schema is out of sync with the model definition, causing errors when attempting to save new attendees.

5 - Answer
```python
# Running the migrations
$ python manage.py makemigrations
$ python manage.py migrate

# No changes needed in the existing code since the migrations are now in sync
from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=100)
    event_date = models.DateTimeField()

class Attendee(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    registered_date = models.DateTimeField(auto_now_add=True)

# View to handle attendee registration
def register_attendee(request, event_id):
    event = Event.objects.get(id=event_id)
    name = request.POST.get('name')
    email = request.POST.get('email')
    attendee = Attendee(event=event, name=name, email=email)
    attendee.save()
    return render(request, 'registration_success.html', {'attendee': attendee})
```
By ensuring that the database migrations are applied, the new field `registered_date` will be properly added to the database schema, resolving the registration errors.

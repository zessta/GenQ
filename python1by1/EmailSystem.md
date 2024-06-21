Question 4

0 - Topics
- Signal Handling
- Data Integrity
- Avoiding Circular Imports
- Best Practices in Signal Usage

1 - Scenario
A notification system in a Django application sends an email to the user each time their profile is updated. The developer implemented a signal to handle this. However, there are cases where users report receiving multiple emails for a single update.

2 - Code
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()

@receiver(post_save, sender=UserProfile)
def send_profile_update_email(sender, instance, **kwargs):
    send_mail(
        'Profile Updated',
        'Your profile has been updated.',
        'from@example.com',
        [instance.user.email],
        fail_silently=False,
    )

# Updating user profile
user_profile = UserProfile.objects.get(user_id=1)
user_profile.bio = "New bio"
user_profile.save()
```

3 - Question
Users are receiving multiple emails for a single profile update. Identify and explain the issue in the code.

4 - Explanation
The signal is connected in such a way that it triggers on every save

 operation of the UserProfile model, including any internal or secondary saves that may occur within other signals or save operations, leading to multiple emails being sent for a single logical update.

5 - Answer
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()

@receiver(post_save, sender=UserProfile)
def send_profile_update_email(sender, instance, created, **kwargs):
    if not created:
        send_mail(
            'Profile Updated',
            'Your profile has been updated.',
            'from@example.com',
            [instance.user.email],
            fail_silently=False,
        )

# Updating user profile
user_profile = UserProfile.objects.get(user_id=1)
user_profile.bio = "New bio"
user_profile.save()
```
In this corrected version, the signal handler checks if the instance is newly created or updated. The email is sent only if the instance is updated (not newly created), avoiding multiple emails for a single update.

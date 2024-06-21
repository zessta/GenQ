Question 14

0 - Topics
- Django Template Tags and Filters
- Custom Template Tags
- Context Processing

1 - Scenario
A Django application uses a custom template tag to display a user's profile information in a sidebar. However, users are reporting that the sidebar sometimes displays incorrect or outdated information.

2 - Code
```python
# templatetags/profile_tags.py
from django import template
from myapp.models import UserProfile

register = template.Library()

@register.simple_tag
def user_profile(user_id):
    try:
        return UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return None

# sidebar.html
{% load profile_tags %}
{% user_profile request.user.id as profile %}
<div class="sidebar">
    <h2>{{ profile.username }}</h2>
    <p>{{ profile.bio }}</p>
</div>

# views.py
from django.shortcuts import render

def dashboard(request):
    return render(request, 'dashboard.html')
```

3 - Question
The sidebar sometimes displays incorrect or outdated information. Identify and explain the issue in the code.

4 - Explanation
The custom template tag `user_profile` fetches the profile using the user ID, but it does not account for any caching or data updates. If the profile data is updated, it might not reflect immediately due to caching or database lag.

5 - Answer
```python
# templatetags/profile_tags.py
from django import template
from myapp.models import UserProfile
from django.core.cache import cache

register = template.Library()

@register.simple_tag
def user_profile(user_id):
    cache_key = f'user_profile_{user_id}'
    profile = cache.get(cache_key)
    if not profile:
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            cache.set(cache_key, profile, 300)  # Cache for 5 minutes
        except UserProfile.DoesNotExist:
            return None
    return profile

# sidebar.html
{% load profile_tags %}
{% user_profile request.user.id as profile %}
<div class="sidebar">
    <h2>{{ profile.username }}</h2>
    <p>{{ profile.bio }}</p>
</div>

# views.py
from django.shortcuts import render

def dashboard(request):
    return render(request, 'dashboard.html')
```
In the corrected version, the custom template tag caches the user profile data to reduce database hits and ensure that changes are reflected after a cache expiry time, improving consistency and performance.

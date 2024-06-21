Question 10

0 - Topics
- Django REST Framework
- Serializer Validation
- API Permissions

1 - Scenario
A Django REST API allows users to create and update profiles. The developer implemented custom validation to ensure that the username is unique. However, users are reporting that they can sometimes create profiles with duplicate usernames.

2 - Code
```python
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from myapp.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'bio']

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

# Registering the viewset in urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UserProfileViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

3 - Question
Users are reporting that they can sometimes create profiles with duplicate usernames. Identify and explain the issue in the code.

4 - Explanation
The issue is due to a race condition where two requests can pass the `validate_username` check simultaneously before either saves the new profile to the database. This allows both requests to create profiles with the same username.

5 - Answer
```python
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from myapp.models import UserProfile
from django.db import IntegrityError

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'bio']

    def create(self, validated_data):
        try:
            return UserProfile.objects.create(**validated_data)
        except IntegrityError:
            raise serializers.ValidationError("Username already exists")

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

# Registering the viewset in urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UserProfileViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```
In this corrected version, the `create` method catches `IntegrityError` exceptions raised by the database if a duplicate username is attempted. This ensures that even concurrent requests cannot create duplicate usernames.

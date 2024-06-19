Question 5

0 - Topics
- Django Forms and Form Validation
- Custom Validators
- Handling File Uploads

1 - Scenario
An application allows users to upload their profile pictures. The developer has implemented a custom form to handle the upload and added a custom validator to ensure the uploaded file is an image. However, users are reporting that non-image files are being accepted.

2 - Code
```python
from django import forms
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions
from django.core.files.uploadedfile import UploadedFile
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pics/')

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

    def clean_profile_picture(self):
        file = self.cleaned_data.get('profile_picture')
        if file:
            if not self.is_image(file):
                raise ValidationError("Uploaded file is not an image.")
        return file

    def is_image(self, file: UploadedFile):
        try:
            get_image_dimensions(file)
            return True
        except Exception:
            return False

# Handling the form in a view
def upload_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    else:
        form = ProfilePictureForm()
    return render(request, 'upload.html', {'form': form})
```

3 - Question
Non-image files are being accepted as valid profile pictures. Identify and explain the issue in the code.

4 - Explanation
The `get_image_dimensions` function only checks the dimensions of the image but does not validate if the file is an image itself. If the file isn't an image, `get_image_dimensions` might still return dimensions without raising an exception, leading to incorrect validation results.

5 - Answer
```python
from django import forms
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions
from django.core.files.uploadedfile import UploadedFile
from django.db import models
from PIL import Image

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pics/')

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

    def clean_profile_picture(self):
        file = self.cleaned_data.get('profile_picture')
        if file:
            if not self.is_image(file):
                raise ValidationError("Uploaded file is not an image.")
        return file

    def is_image(self, file: UploadedFile):
        try:
            # Open the file to verify it's an image
            Image.open(file).verify()
            return True
        except Exception:
            return False

# Handling the form in a view
def upload_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    else:
        form = ProfilePictureForm()
    return render(request, 'upload.html', {'form': form})
```


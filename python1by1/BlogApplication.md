Question 15

0 - Topics
- Django ORM
- Aggregation
- Prefetch Related

1 - Scenario
A blog application shows the number of comments for each post on the homepage. Users report that the homepage loads slowly when there are many posts and comments.

2 - Code
```python
from django.shortcuts import render
from myapp.models import Post, Comment

def homepage(request):
    posts = Post.objects.all()
    post_comments = {post.id: post.comments.count() for post in posts}
    return render(request, 'homepage.html', {'posts': posts, 'post_comments': post_comments})

# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
```

3 - Question
The homepage loads slowly when there are many posts and comments. Identify and explain the issue in the code.

4 - Explanation
The current implementation results in an N+1 query problem. For each post, a separate query is made to count the comments, which is highly inefficient and slows down the page load significantly when there are many posts and comments.

5 - Answer
```python
from django.shortcuts import render
from myapp.models import Post
from django.db.models import Count

def homepage(request):
    posts = Post.objects.annotate(comment_count=Count('comments')).all()
    return render(request, 'homepage.html', {'posts': posts})

# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
```
In the corrected version, the `annotate` method is used to add a `comment_count` attribute to each post in a single query, eliminating the N+1 query problem and significantly improving performance.

These questions test various advanced Django topics and combinations, providing a comprehensive challenge for senior developers.



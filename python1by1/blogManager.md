Question 2

0 - Topics
- Custom Manager Methods
- QuerySets and Lazy Evaluation
- Aggregation
- Handling Large Querysets

1 - Scenario
A blog application needs to display the top 5 most commented posts. The developer has written a custom manager method to achieve this. However, the page displaying the top posts is very slow, indicating there might be inefficiencies in the code.

2 - Code
```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

class PostManager(models.Manager):
    def top_commented_posts(self):
        posts = self.get_queryset()
        posts_with_comment_count = [(post, post.comments.count()) for post in posts]
        sorted_posts = sorted(posts_with_comment_count, key=lambda x: x[1], reverse=True)
        return [post for post, count in sorted_posts[:5]]

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    objects = PostManager()

# Using the custom manager
top_posts = Post.objects.top_commented_posts()
```

3 - Question
The page that displays the top 5 most commented posts is very slow. Identify and explain the inefficiency in the code.

4 - Explanation
The code retrieves all posts and then manually counts the comments for each post in Python, which results in multiple database queries (one for each post). This is highly inefficient, especially with a large number of posts, causing significant performance degradation.

5 - Answer
```python
from django.db import models
from django.db.models import Count

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

class PostManager(models.Manager):
    def top_commented_posts(self):
        return self.get_queryset().annotate(comment_count=Count('comments')).order_by('-comment_count')[:5]

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    objects = PostManager()

# Using the custom manager
top_posts = Post.objects.top_commented_posts()
```

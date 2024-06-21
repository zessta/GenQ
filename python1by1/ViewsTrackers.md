Question 8

0 - Topics
- Django Signals
- Data Consistency
- Database Transactions

1 - Scenario
A web application tracks the number of views for each article. The developer implemented a signal to increment the view count every time an article is viewed. However, under heavy traffic, the view counts are inaccurate.

2 - Code
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    view_count = models.PositiveIntegerField(default=0)

class ArticleView(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    view_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=ArticleView)
def increment_view_count(sender, instance, **kwargs):
    article = instance.article
    article.view_count += 1
    article

.save()

# View function to handle article viewing
def view_article(request, article_id):
    article = Article.objects.get(id=article_id)
    ArticleView.objects.create(article=article)
    return render(request, 'article.html', {'article': article})
```

3 - Question
The view counts are inaccurate under heavy traffic. Identify and explain the issue in the code.

4 - Explanation
The issue is due to a race condition where multiple increments to the view count can occur simultaneously, causing some increments to be lost. This happens because each view triggers a separate database save operation without any locking mechanism to ensure atomicity.

5 - Answer
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    view_count = models.PositiveIntegerField(default=0)

class ArticleView(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    view_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=ArticleView)
def increment_view_count(sender, instance, **kwargs):
    with transaction.atomic():
        article = instance.article
        article.view_count = Article.objects.select_for_update().get(id=article.id).view_count + 1
        article.save()

# View function to handle article viewing
def view_article(request, article_id):
    article = Article.objects.get(id=article_id)
    ArticleView.objects.create(article=article)
    return render(request, 'article.html', {'article': article})
```
In this corrected version, the `select_for_update` method is used within a transaction to lock the row and ensure atomicity, preventing race conditions and ensuring accurate view counts under heavy traffic.

These additional debugging questions cover more advanced Django topics, providing challenging scenarios for senior developers to solve.



Question 7

0 - Topics
- Django Caching
- Template Caching
- Cache Invalidation

1 - Scenario
A news website caches the homepage to improve performance. The homepage shows the latest articles. However, users are reporting that new articles are not appearing on the homepage immediately after being published.

2 - Code
```python
from django.core.cache import cache
from django.shortcuts import render
from myapp.models import Article

def homepage(request):
    cached_homepage = cache.get('homepage')
    if cached_homepage:
        return cached_homepage

    articles = Article.objects.order_by('-published_date')[:10]
    response = render(request, 'homepage.html', {'articles': articles})
    cache.set('homepage', response, 300)  # Cache for 5 minutes
    return response

# Adding a new article
def add_article(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article.objects.create(title=title, content=content)
        cache.delete('homepage')  # Invalidate the homepage cache
        return redirect('homepage')
    return render(request, 'add_article.html')
```

3 - Question
New articles are not appearing on the homepage immediately after being published. Identify and explain the issue in the code.

4 - Explanation
The cache invalidation logic is correct, but there's a potential race condition. If the homepage is accessed frequently, there might be a small window where the cache is deleted but not yet regenerated, causing the old cache to still be served temporarily.

5 - Answer
```python
from django.core.cache import cache
from django.shortcuts import render
from myapp.models import Article

def homepage(request):
    cached_homepage = cache.get('homepage')
    if cached_homepage:
        return cached_homepage

    articles = Article.objects.order_by('-published_date')[:10]
    response = render(request, 'homepage.html', {'articles': articles})
    cache.set('homepage', response, 300)  # Cache for 5 minutes
    return response

# Adding a new article
def add_article(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article.objects.create(title=title, content=content)
        # Double check if cache deletion is necessary before and after article creation
        cache.delete('homepage')  # Invalidate the homepage cache
        return redirect('homepage')
    return render(request, 'add_article.html')
```
In the corrected version, we ensure the cache is deleted before redirecting to the homepage, thus minimizing the window where the old cache might still be served. Additional precautions can be taken if necessary, such as more aggressive invalidation or instant cache regeneration.


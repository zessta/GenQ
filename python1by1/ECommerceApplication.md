Question 3

0 - Topics
- Custom Model Methods
- Signals and Side Effects
- Data Integrity
- Concurrency Issues

1 - Scenario
An e-commerce application has a Product model with a method to decrease the stock quantity when an order is placed. A signal is used to call this method after an Order object is created. However, sometimes the stock quantity does not decrease correctly, especially under high load.

2 - Code
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Product(models.Model):
    name = models.CharField(max_length=100)
    stock = models.IntegerField()

    def decrease_stock(self, quantity):
        self.stock -= quantity
        self.save()

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=Order)
def decrease_product_stock(sender, instance, **kwargs):
    instance.product.decrease_stock(instance.quantity)

# Creating an order
product = Product.objects.create(name="Laptop", stock=10)
order = Order.objects.create(product=product, quantity=1)
```

3 - Question
Under high load, the stock quantity of products is not always updated correctly. Identify and explain the concurrency issue in the code.

4 - Explanation
The code does not handle concurrent updates to the product stock properly. When multiple orders are placed simultaneously, race conditions can occur, causing the stock quantity to be updated incorrectly. This happens because the `decrease_stock` method reads and writes the stock without any locking mechanism to ensure atomicity.

5 - Answer
```python
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction

class Product(models.Model):
    name = models.CharField(max_length=100)
    stock = models.IntegerField()

    def decrease_stock(self, quantity):
        with transaction.atomic():
            self.refresh_from_db()
            self.stock -= quantity
            self.save()

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

@receiver(post_save, sender=Order)
def decrease_product_stock(sender, instance, **kwargs):
    instance.product.decrease_stock(instance.quantity)

# Creating an order
product = Product.objects.create(name="Laptop", stock=10)
order = Order.objects.create(product=product, quantity=1)
```


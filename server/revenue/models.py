from django.db import models

# Create your models here.

class Transaction(models.Model):
    transaction_id = models.CharField(max_length=100)
    date = models.DateField()
    price = models.DecimalField()

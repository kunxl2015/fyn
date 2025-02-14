from django.db import models

# Create your models here.

class Transaction(models.Model):
    id = models.CharField(primary_key=True, unique=True ,max_length=100)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)


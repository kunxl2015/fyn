from django.db import models

# Create your models here.

class Part(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField()
    is_repairable = models.BooleanField(True)

    def __str__(self):
        return f"{self.name}"

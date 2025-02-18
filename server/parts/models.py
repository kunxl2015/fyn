from django.db import models

class Part(models.Model):
	name = models.CharField(max_length=100)
	image = models.ImageField(blank=True, null=True, upload_to="parts/")
	purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
	repair_price = models.DecimalField(max_digits=10, decimal_places=2)

	def __str__(self):
		return f"{self.name}"

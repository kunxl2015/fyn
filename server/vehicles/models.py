from django.db import models

from parts.models import Part

VEHICLE_STATUS = (
	('Pending', 'Pending'),
	('In Progress', 'In Progress'),
	('Completed', 'Completed')
)

class Vehicle(models.Model):
	id = models.CharField(max_length=100, unique=True, primary_key=True)
	make = models.CharField(max_length=100)
	model = models.CharField(max_length=100)
	image = models.ImageField(blank=True, null=True, upload_to="vehicles/")
	amount = models.DecimalField(default=0.0, max_digits=10, decimal_places=2)
	issue_description = models.CharField(max_length=100)
	repair = models.ManyToManyField(Part, blank=True, related_name="repair")
	replace = models.ManyToManyField(Part, blank=True, related_name="replace")
	status = models.CharField(max_length=100, choices=VEHICLE_STATUS)

	def __str__(self):
		return f"{self.make} {self.model} {self.id}"

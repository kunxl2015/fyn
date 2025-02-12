from django.db import models

# Create your models here.

VEHICLE_STATUS = (
    ('Pending', 'Pending'),
    ('In Progress', 'In Progress'),
    ('Completed', 'Completed')
)

class Vehicle(models.Model):
    id = models.CharField(max_length=100, unique=True, primary_key=True)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    issue_description = models.TextField()
    repair_description = models.TextField()
    status = models.CharField(max_length=100, choices=VEHICLE_STATUS)

    def __str__(self):
        return f"{self.make} {self.model} {self.id}"


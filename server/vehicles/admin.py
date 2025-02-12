from django.contrib import admin

from vehicles.models import Vehicle

# Register your models here.

class VehilcleAdmin(admin.ModelAdmin):
    pass

admin.register(Vehicle, VehilcleAdmin)

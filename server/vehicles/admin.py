from django.contrib import admin

from vehicles.models import Vehicle

# Register your models here.

class VehilcleAdmin(admin.ModelAdmin):
    list_display = ['id', 'make', 'model', 'issue_description', 'repair_description', 'status']
    search_fields = ['make', 'model', 'status']

admin.site.register(Vehicle, VehilcleAdmin)

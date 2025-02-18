from django.contrib import admin

from vehicles.models import Vehicle

class VehilcleAdmin(admin.ModelAdmin):
	list_display = ['id', 'make', 'model', 'amount', 'status']
	search_fields = ['make', 'model', 'status']

admin.site.register(Vehicle, VehilcleAdmin)

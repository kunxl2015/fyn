from django.contrib import admin

from parts.models import Part

# Register your models here.
class PartAdmin(admin.ModelAdmin):
	list_display = ["id", "name", "purchase_price", "repair_price"]
	search_fields = ["name"]

admin.site.register(Part, PartAdmin)

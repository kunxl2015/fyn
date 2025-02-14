from django.contrib import admin

from revenue.models import Transaction

# Register your models here.

class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'date', 'amount']
    list_filter = ['date']
    search_fields = ['id']

admin.site.register(Transaction, TransactionAdmin)

from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from parts.models import Part

class PartSerializer(serializers.ModelSerializer):
	image = Base64ImageField()
	purchasePrice = serializers.FloatField(source='purchase_price')
	repairPrice = serializers.FloatField(source='repair_price')

	class Meta:
		model = Part
		fields = ['id', 'name', 'image', 'purchasePrice', 'repairPrice']

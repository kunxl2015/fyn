from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from parts.models import Part
from vehicles.models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):
	issueDescription = serializers.CharField(source='issue_description')
	repair = serializers.PrimaryKeyRelatedField(many=True, queryset=Part.objects.all())
	replace = serializers.PrimaryKeyRelatedField(many=True, queryset=Part.objects.all())
	image = Base64ImageField()

	class Meta:
		model = Vehicle
		fields = ['id', 'make', 'model', 'image', 'amount',
		'issueDescription', 'repair', 'replace', 'status']

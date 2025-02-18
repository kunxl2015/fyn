from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response

from parts.models import Part
from parts.serializer import PartSerializer

@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/regiter/",
        "/view/",
    ]

    return Response(routes)

@api_view(["POST"])
def register(request):
	part = PartSerializer(data=request.data)
	if not part.is_valid():
		return Response("Error in Registering Part", 400)

	part.save()
	return Response("Registered Part Successfully", 200)

@api_view(['GET'])
def view(request):
    parts = Part.objects.all()
    serializer = PartSerializer(parts, many=True)

    return Response(serializer.data, status=200)

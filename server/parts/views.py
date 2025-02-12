from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from parts.models import Part
from parts.serializer import PartSerializer

# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/regiter/",
        "/view/",
    ]

    return Response(routes)

@api_view(["POST"])
def register(request):
    name = request.POST.get('name')
    price = request.POST.get('price')
    repair = request.POST.get('repair')
    is_repairable = request.POST.get('is_repairable')

    part = Part(name, price, repair, is_repairable)
    part.save()

    return Response(name)

@api_view(['GET'])
def view(request):
    # Fetch all parts from database
    parts = Part.objects.all()
    serializer = PartSerializer(parts, many=True)

    return Response(serializer.data, status=200)

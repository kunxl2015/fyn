from django.db import models
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from vehicles.models import Vehicle
from vehicles.serializer import VehicleSerializer

# Create your views here.

@api_view(["GET"])
def get_routes(request):
    routes = [
        '/register/',
        '/view/',
        '/view/<str:id>/',
        '/update/<str:id>/'
    ]

    return Response(routes)

@api_view(["POST"])
def register_vehicle(request):
    serializer = VehicleSerializer(data=request.data)

    if not serializer.is_valid():
        Response(serializer.errors, status=400)

    serializer.save()
    return Response({"message": "Vehicle registered successfully", "vehicle": serializer.data}, status=201)


@api_view(["GET"])
def view_vehicles(request):
    vehicles = Vehicle.objects.all()
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data, status=200)

@api_view(["GET"])
def view_vehicle(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
        serializer = VehicleSerializer(vehicle)
        return Response(serializer.data, status=200)
    except Vehicle.DoesNotExist:
        return Response({"error": "Vehicle not found"}, status=404)

@api_view(["PATCH"])
def update_vehicle_status(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
        status = request.data.get("status")
        if status not in ["Pending", "In Progress", "Completed"]:
            return Response({"error": "Invalid status"}, status=400)

        vehicle.status = status
        vehicle.save()
        serializer = VehicleSerializer(vehicle)
        return Response({"message": "Vehicle status updated", "vehicle": serializer.data}, status=200)

    except Vehicle.DoesNotExist:
        return Response({"error": "Vehicle not found"}, status=404)

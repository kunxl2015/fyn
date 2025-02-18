import datetime
import uuid

from django.db import models
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from vehicles.models import Vehicle
from revenue.models import Transaction
from vehicles.serializer import VehicleSerializer

@api_view(["GET"])
def get_routes(request):
    routes = [
        '/view/',
        '/register/',
        '/fix/<int:id>/'
    ]

    return Response(routes)

@api_view(["GET"])
def view_vehicles(request):
    vehicles = Vehicle.objects.all()
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data, status=200)

@api_view(["POST"])
def register_vehicle(request):
	vehicle = VehicleSerializer(data=request.data)
	if not vehicle.is_valid():
		print(vehicle.errors)
		return Response(vehicle.errors, status=400)

	vehicle.save()
	return Response("Vehicle registered successfully", status=200)

@api_view(['POST'])
def fix_vehicle(request, id):
    vehicle = Vehicle.objects.get(id=id)

    id = f"TX-{uuid.uuid4().hex[:6].upper()}"
    date = datetime.date.today()
    amount = vehicle.amount
    transaction = Transaction(id, date, amount)
    transaction.save()

    vehicle.status = 'Completed'
    vehicle.save()

    return Response("Transaction Completed successfully", status=201)

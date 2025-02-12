from django.urls import path

from vehicles import views

urlpatterns = [
    path("", views.get_routes),
    path('register/', views.register_vehicle),
    path('view/', views.view_vehicles),
    path('view/<str:id>/', views.view_vehicle),
    path('update/<str:id>/', views.update_vehicle_status)
]

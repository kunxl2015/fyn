from django.urls import path

from vehicles import views

urlpatterns = [
	path("", views.get_routes),
	path('register/', views.register_vehicle),
	path('view/', views.view_vehicles),
    path('fix/<str:id>/', views.fix_vehicle)
]

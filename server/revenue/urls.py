from django.urls import path

from revenue import views

urlpatterns = [
    path('', views.get_routes),
    path('<id:int>/', views.get_revenue)
]

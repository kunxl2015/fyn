from django.urls import path

from revenue import views

urlpatterns = [
    path('', views.get_routes),
    path('<int:id>/', views.get_revenue)
]

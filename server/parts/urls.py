from django.urls import path

from parts import views

urlpatterns = [
    path("", views.getRoutes),
    path("register/", views.register),
    path("view/", views.view)
]

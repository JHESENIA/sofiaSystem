from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('usuarios/', views.usuarios, name='usuarios'),
    path('logs/', views.logs, name='logs'),
    path('configuracion/', views.configuraciones, name='configuraciones'),
]

from django.urls import path
from . import views

urlpatterns = [
        path('', views.login_view, name='usuarios_login'),
        path('home/', views.usuarios_home, name='usuarios_home'),
        path('logout/', views.logout_view, name='logout'),
    ]

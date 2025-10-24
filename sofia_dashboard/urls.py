from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Dashboard principal
    path('', include('panel.urls')),

    # Rutas de autenticación y gestión de usuarios
    path('usuarios/', include('usuarios.urls')),
]

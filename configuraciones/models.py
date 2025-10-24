from django.db import models
from django.utils import timezone

class ProcesoMonitoreado(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.CharField(max_length=50, choices=[
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('error', 'Error'),
        ('en_ejecucion', 'En ejecución'),
    ], default='activo')
    descripcion = models.TextField(blank=True, null=True)
    ultima_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre} ({self.estado})"


class LogActividad(models.Model):
    usuario = models.CharField(max_length=100)
    accion = models.CharField(max_length=200)
    fecha = models.DateTimeField(default=timezone.now)
    nivel = models.CharField(max_length=20, choices=[
        ('info', 'Info'),
        ('advertencia', 'Advertencia'),
        ('error', 'Error'),
    ], default='info')
    detalles = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.fecha.strftime('%Y-%m-%d %H:%M:%S')} - {self.usuario}: {self.accion}"

from django.db import models
from django.utils import timezone

class LogSistema(models.Model):
    tipo = models.CharField(max_length=50)  # info, advertencia, error, etc.
    mensaje = models.TextField()
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"[{self.tipo}] {self.mensaje[:50]}"

class Estadistica(models.Model):
    nombre = models.CharField(max_length=100)
    valor = models.IntegerField(default=0)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre}: {self.valor}"

from django.http import HttpResponse

def index(request):
    return HttpResponse("Sección de configuraciones del sistema Sofia Dashboard")

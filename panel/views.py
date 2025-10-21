from django.shortcuts import render

def dashboard(request):
    return render(request, 'panel/dashboard.html')

def usuarios(request):
    return render(request, 'panel/usuarios.html')

def logs(request):
    return render(request, 'panel/logs.html')

def configuraciones(request):
    return render(request, 'panel/configuracion.html')

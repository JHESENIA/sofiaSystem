from django.shortcuts import render

def usuarios_home(request):
    return render(request, 'usuarios/home.html')

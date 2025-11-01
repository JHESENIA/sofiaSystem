from django.http import HttpResponse

def login_view(request):
    return HttpResponse("✅ Página de inicio de sesión funcionando correctamente")

def usuarios_home(request):
    return HttpResponse("🏠 Bienvenido al panel de usuarios")

def logout_view(request):
    return HttpResponse("👋 Has cerrado sesión correctamente")

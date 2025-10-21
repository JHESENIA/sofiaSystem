from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-8#eg(8p!y7n9pidkdvsg&$3g_b&l^j&j-n=3i5vhu#tee)u8he'

DEBUG = True
ALLOWED_HOSTS = []

# ---------------------------------
# APPS INSTALADAS
# ---------------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Tus apps personalizadas
    'panel',
    'usuarios',
    'monitoreo',
    'configuraciones',
    'core',
]

# ---------------------------------
# MIDDLEWARE
# ---------------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sofia_dashboard.urls'

# ---------------------------------
# TEMPLATES
# ---------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / "templates",          # Carpeta global (si la usas)
            BASE_DIR / "panel" / "templates" # Plantillas dentro de panel
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sofia_dashboard.wsgi.application'

# ---------------------------------
# BASE DE DATOS
# ---------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ---------------------------------
# VALIDADORES DE CONTRASEÑA
# ---------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# ---------------------------------
# INTERNACIONALIZACIÓN
# ---------------------------------
LANGUAGE_CODE = 'es'
TIME_ZONE = 'America/Lima'
USE_I18N = True
USE_TZ = True

# ---------------------------------
# ARCHIVOS ESTÁTICOS
# ---------------------------------
STATIC_URL = '/static/'

# ✅ Ya no es necesario incluir BASE_DIR / "panel" aquí
# Django detecta automáticamente los archivos estáticos dentro de cada app
# (porque usas 'django.contrib.staticfiles' y tienes panel/static/)
# Solo deja la carpeta global si algún día agregas un "static" fuera de las apps
STATICFILES_DIRS = [
    BASE_DIR /"panel"/"static",
]

STATIC_ROOT = BASE_DIR / "staticfiles"

# ---------------------------------
# CONFIGURACIÓN FINAL
# ---------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

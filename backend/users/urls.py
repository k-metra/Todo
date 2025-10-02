from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_api, name='login_api'),
    path('register/', register_api, name='register_api'),
    path('verify-session/', verify_session, name='verify_session_api'),
]
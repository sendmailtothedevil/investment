from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('signup-signin', views.signup_signin, name='signup_signin'),
    path('dashboard', views.dashboard, name='dashboard'),
]



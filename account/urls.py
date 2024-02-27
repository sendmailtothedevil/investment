from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('signup-signin', views.signup_signin, name='signup_signin'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('dashboard/packages', views.packages, name='packages'),
    path('dashboard/users', views.users, name='users'),
    path('delete-user/', views.delete_user, name='delete_user'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]



from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('signup-signin', views.signup_signin, name='signup_signin'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('dashboard/packages', views.packages, name='packages'),
    path('dashboard/message', views.message, name='message'),
    path('dashboard/users', views.users, name='users'),
    path('dashboard/gateway', views.gateway, name='gateway'),
    path('dashboard/transactions', views.transactions, name='transactions'),
    path('dashboard/settings', views.settings, name='settings'),

    path('delete-user/', views.delete_user, name='delete_user'),
    path('delete-gateway/', views.delete_gateway, name='delete_gateway'),
    path('activate-gateway/', views.activate_gateway, name='activate_gateway'),
    path('deactivate-gateway/', views.deactivate_gateway, name='deactivate_gateway'),
    path('delete-message/', views.delete_message, name='delete_message'),
]



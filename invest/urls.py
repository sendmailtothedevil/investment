from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('investment-plan', views.investment_plan, name='investment_plan'),
]



from django.core.checks import messages
from django.shortcuts import redirect, render
from .models import *
from django.http import JsonResponse


# Create your views here.
def signup_signin(request):
    context = {}
    return render(request, 'account/signup-signin.html', context)

def dashboard(request):
    context = {}
    return render(request, 'account/dashboard.html', context)
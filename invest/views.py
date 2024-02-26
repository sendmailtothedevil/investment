from django.core.checks import messages
from django.shortcuts import redirect, render
from .models import *
from django.http import JsonResponse


# Create your views here.
def investment_plan(request):
    
    context = {}
    return render(request, 'invest/investment-plan.html', context)


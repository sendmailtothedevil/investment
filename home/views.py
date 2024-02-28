from django.core.checks import messages
from django.shortcuts import redirect, render
from .models import *
from invest.models import Package
from django.http import JsonResponse


# Create your views here.
def index(request):
    package = Package.objects.all()[:4]
    context = {'package':package}
    return render(request, 'home/index.html', context)


def handler404(request, exception):
    context = {}
    response = render(request, "home/error_404.html", context=context)
    response.status_code = 404
    return response


from django.core.checks import messages
from django.shortcuts import redirect, render
from .models import *
from django.http import JsonResponse


# Create your views here.
def investment_plan(request):
    
    context = {}
    return render(request, 'invest/investment-plan.html', context)


def add_package(request):
    if request.user.is_admin:
        if request.method == 'POST':
            # if request.user.is_authenticated:
            user = request.user
            title = request.POST.get('packages')
            profit = request.POST.get('daily_profit')
            days = request.POST.get('no_of_days')
            bonus = request.POST.get('pur_bonus')
            min = request.POST.get('min')
            max = request.POST.get('max')
            amount = 0
            
            newPackage = Package.objects.create(
                    user=user, title=title,
                    profit=profit, days=days,
                    bonus=bonus, min=min,
                    max=max, amount=amount
                    )
            newPackage.save()
            
            return JsonResponse({'status':"Package added successfully"})
        else:
            return JsonResponse({'status':"An error occured"})


def edit_package(request):
    if request.user.is_admin:
        if request.method == 'POST':
            pkg_id = int(request.POST.get('pkg_id'))
            spec_pkg = Package.objects.get(id=pkg_id)
            spec_pkg.title = request.POST.get('pkg_title')
            spec_pkg.profit = request.POST.get('daily_profit')
            spec_pkg.days = request.POST.get('no_of_days')
            spec_pkg.bonus = request.POST.get('pur_bonus')
            spec_pkg.min = request.POST.get('min')
            spec_pkg.max = request.POST.get('max')
            spec_pkg.amount = request.POST.get('amount')
            
            spec_pkg.save()
            
            return JsonResponse({'status':"Package Edited successfully"})
        else:
            return JsonResponse({'status':"An error occured"})


def delete_package(request):
    if request.user.is_admin:
        if request.method == 'POST':
            package_id = int(request.POST.get('package_id'))
            Package.objects.filter(id=package_id).delete()
            
            return JsonResponse({'status':"Package deleted successfully"})
        else:
            return JsonResponse({'status':"An error occured"})


def activate_package(request):
    if request.user.is_admin:
        if request.method == 'POST':
            if request.user.is_admin:
                id = request.POST.get("package_id")
                pkg = Package.objects.get(pk=id)
                pkg.status = True
                pkg.save()
            
            return JsonResponse({'status':"Package activated successfully"})
        else:
            return JsonResponse({'status':"An error occured"})
    

def deactivate_package(request):
    if request.user.is_admin:
        if request.method == 'POST':
            id = request.POST.get("package_id")
            pkg = Package.objects.get(pk=id)
            pkg.status = False
            pkg.save()
        
            return JsonResponse({'status':"Package deactivated successfully"})
        else:
            return JsonResponse({'status':"An error occured"})



from django.core.checks import messages
from django.shortcuts import redirect, render
from .models import *
from account .models import *
from django.http import JsonResponse


# Create your views here.
def investment_plan(request):
    package = Package.objects.all()
    gateway = Gateway.objects.filter(status=True)
            
    context = {'package':package, 'gateway':gateway}
    return render(request, 'invest/investment-plan.html', context)


def transaction(request):
    if request.method == "POST":
        user = request.user
        trans_plan = request.POST.get('trans_plan')
        trans_profit = request.POST.get('trans_profit')
        trans_days = request.POST.get('trans_days')
        trans_bonus = request.POST.get('trans_bonus')
        trans_amount = request.POST.get('trans_amount')
        trans_paym = request.POST.get('trans_paym')
        trans_paya = request.POST.get('trans_paya')
        trans_paid = request.POST.get('trans_paid')

        new_transaction = Transaction.objects.create(
            user = user, trans_plan = trans_plan, trans_profit = trans_profit, trans_days = trans_days, trans_bonus = trans_bonus,
            trans_amount = trans_amount, trans_paym = trans_paym, trans_paya = trans_paya, trans_paid = trans_paid
        )
        new_transaction.save()
        
        new_user_package = UserPackage.objects.create(
            user = user, title = trans_plan, profit = trans_profit, days = trans_days, bonus = trans_bonus,
            amount = trans_amount
        )
        new_user_package.save()
        
        return JsonResponse({'status':"Confirming your plan..."})

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



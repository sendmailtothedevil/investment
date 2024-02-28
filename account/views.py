from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from .models import *
from invest.models import *
from django.db.models import Q
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
import json
from urllib.request import urlopen
from django.contrib.auth import update_session_auth_hash
from .forms import MyChangePasswordForm, PasswordResetForm, SetPasswordForm
from django.core.mail import EmailMessage

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .tokens import account_activation_token



# def activate(request, uidb64, token):
#     # user = User()
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except(TypeError, ValueError, OverflowError, User.DoesNotExist):
#         user = None

#     if user is not None and account_activation_token.check_token(user, token):
#         user.is_active = True
#         user.save()

#         messages.success(request, 'Thank you! Your email is verified.')
#         return redirect('login')
#     else:
#         messages.error(request, 'Activation link is invalid!')
#     return redirect('index')

# User Register
def register(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        if User.objects.filter(email__iexact=email).exists():
            return JsonResponse({'status':"Email already exist, try another..."})

        
        user = User.objects.create_user(full_name=full_name, email=email, password=password,)
        
        user.save()
        # verification_email = EmailMessage(
        #     subject = 'Verify your email',
        #     body = render_to_string('account/verify-email.html', {
        #         'user': user.full_name,
        #         'domain': get_current_site(request).domain,
        #         'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        #         'token': account_activation_token.make_token(user),
        #         'protocol': 'https' if request.is_secure() else 'http'
        #     }),
        #     to = [email],
        # )
        # verification_email.send()
        
        return JsonResponse({"data": email})
    else:
        return render(request, 'account/signup-signin.html')
    


# User Login
def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = auth.authenticate(email = email, password = password)
        
        if user is not None:
            auth.login(request, user)
            messages.add_message(request, messages.SUCCESS, 'Login successfull')
            return redirect('index')
        elif not User.objects.filter(email__iexact=email).exists():
            return JsonResponse({'status':"No account found...REGISTER"})
        else:
            return JsonResponse({'status':"Incorrect password"})
    else:
        return render(request, 'account/signup-signin.html')


# User Logout
@login_required(login_url='login')
def logout(request):
    auth.logout(request)
    messages.add_message(request, messages.SUCCESS, 'Logged out')
    return redirect('/')











# Create your views here.
def signup_signin(request):
    context = {}
    return render(request, 'account/signup-signin.html', context)

@login_required(login_url='login')
def dashboard(request):
    
    context = {}
    return render(request, 'account/dashboard.html', context)


@login_required(login_url='login')
def packages(request):
    packages = Package.objects.all().order_by('-recent', '-post_date')
    
    context = {'packages':packages}
    return render(request, 'account/packages.html', context)


@login_required(login_url='login')
def users(request):
    users = User.objects.all()
    pkgs = Package.objects.all()
    
    context = {'users':users, 'pkgs':pkgs}
    return render(request, 'account/users.html', context)


@login_required(login_url='login')
def delete_user(request):
    if request.method == 'POST':
        user_id = int(request.POST.get('user_id'))
        if request.user.is_admin:
            User.objects.filter(id=user_id).delete()
        
        return JsonResponse({'status':"User deleted successfully"})
    else:
        return JsonResponse({'status':"An error occured"})


@login_required(login_url='login')
def gateway(request):
    gateway = Gateway.objects.all().order_by('-recent')
    if request.method == "POST":
        if request.user.is_admin:
            pay_method = request.POST.get('pay_method')
            pay_address = request.POST.get('pay_address')
            pay_icon = request.FILES['pay_icon']
            
            new_gateway = Gateway.objects.create(
                pay_method = pay_method,
                pay_address = pay_address,
                pay_icon = pay_icon
            )
            new_gateway.save()
            messages.success(request, "Wallet added Successfully")
            return redirect('gateway')
        else:
            messages.success(request, "Only ADMIN can add Payment")
            return redirect('dashboard')
    else:
        context = {'gateway':gateway}
        return render(request, 'account/gateway.html', context)

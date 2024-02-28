from django.contrib import messages
from django.shortcuts import redirect, render
from .models import *
from django.http import JsonResponse


# Create your views here.
def contact(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        newContactMsg = ContactUsMessage.objects.create(sender_email=email, subject=subject, message=message)
        newContactMsg.save()
        messages.add_message(request, messages.SUCCESS, 'Message sent, we\'ll get back to you shortly')
        return redirect('index')

    else:
        return render(request, 'contact/contact.html')


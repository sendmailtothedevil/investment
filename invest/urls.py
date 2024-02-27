from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('investment-plan', views.investment_plan, name='investment_plan'),
    path('add-package/', views.add_package, name='add_package'),
    path('edit-package/', views.edit_package, name='edit_package'),
    path('delete-package/', views.delete_package, name='delete_package'),
    path('activate-package/', views.activate_package, name='activate_package'),
    path('deactivate-package/', views.deactivate_package, name='deactivate_package'),
]



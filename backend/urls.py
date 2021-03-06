"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

from rest_framework.authtoken.views import obtain_auth_token
from comments import views

index = never_cache(TemplateView.as_view(template_name='index.html'))

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),
    # comments
    path('comments/get/<str:username>/', views.get_comments_view, name='get_comments'),
    # interests
    path('interests/get/<str:username>/', views.get_interests_view, name='get_interests'),
    path('interests/create/', views.create_interest_view, name='create_interest'),
    path('interests/delete/<str:interest_id>/', views.delete_interest_view, name='delete_interest'),
    # user authentication
    path('user/register/', views.CreateUserView.as_view(), name='register'),
    path('user/token-auth/', obtain_auth_token, name='token_auth'),
    # React app
    re_path('', index, name='index'),
]

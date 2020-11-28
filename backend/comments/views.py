from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import InterestSerializer
from .models import Interest


class HelloWorldView(APIView):
    def get(self, request, format=None):
        return Response({"message": "Hello world!"})

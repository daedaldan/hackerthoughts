from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, InterestSerializer
from .models import Interest


class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json["token"] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def get_comments_view(request, user_id):
#     interests = Interest.objects.filter(owner=user_id)
#
#     return Response()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_interests_view(request, username):
    interests = Interest.objects.filter(owner=User.objects.get(username=username))
    serializer = InterestSerializer(interests, many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_interest_view(request):
    serializer = InterestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_interest_view(request, interest_id):
    interest = Interest.objects.get(id=interest_id)
    interest.delete()

    return Response("Interest successfully deleted.")


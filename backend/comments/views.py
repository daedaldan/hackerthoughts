from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, InterestSerializer
from .models import Interest

import json
import feedparser
import ssl


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


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_comments_view(request, username):
    interests = Interest.objects.filter(owner=User.objects.get(username=username))
    serializer = InterestSerializer(interests, many=True)

    # parse RSS feed for best comments from Hacker News
    ssl._create_default_https_context = ssl._create_unverified_context
    feed = feedparser.parse('https://hnrss.org/bestcomments')

    recommended_comments = []

    # find comments that match user's interests and add them to recommended list
    for entry in feed['entries']:
        # check if interest keywords are found in comment info
        for interest in serializer.data:
            if interest['interest'].lower() in entry['title'].lower() or interest['interest'].lower() in entry['summary'].lower():
                # create dict with comment info
                comment = {
                    # reformat title
                    "title": "C" + entry['title'][5:],
                    # convert comment summary from HTML to string
                    "comment": ("\n".join(entry['summary'].split('<p>')[1::2]))[:-4],
                    "link": entry['link']
                }
                # add comment to list of recommended comments
                recommended_comments.append(comment)

    return Response(recommended_comments)


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


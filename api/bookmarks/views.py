from rest_framework import generics, permissions
from django.contrib.auth.models import User

from bookmarks.models import Bookmark
from bookmarks.serializers import BookmarkSerializer, UserSerializer
from bookmarks.permissions import IsOwner


class BookmarkList(generics.ListCreateAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = (permissions.IsAuthenticated, IsOwner, permissions.IsAdminUser)


class BookmarkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    permission_classes = (permissions.IsAuthenticated, IsOwner)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAuthenticated, IsOwner, permissions.IsAdminUser)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAuthenticated, IsOwner, permissions.IsAdminUser)

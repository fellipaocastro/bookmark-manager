from django.contrib.auth.models import User

from rest_framework import generics, permissions

from bookmarks.models import Bookmark
from bookmarks.serializers import BookmarkSerializer, UserSerializer
from bookmarks.permissions import IsOwnerOrAdmin


class BookmarkList(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Bookmark.objects.all()

        return Bookmark.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = (permissions.IsAuthenticated,)


class BookmarkDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        return Bookmark.objects.filter(owner=self.request.user)

    permission_classes = (IsOwnerOrAdmin,)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAdminUser,)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAdminUser,)

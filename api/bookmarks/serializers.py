from rest_framework import serializers
from django.contrib.auth.models import User

from bookmarks.models import Bookmark

class BookmarkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bookmark
        fields = ('id', 'name', 'url', 'owner_id')

    owner_id = serializers.ReadOnlyField(source='owner.id')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'is_superuser')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

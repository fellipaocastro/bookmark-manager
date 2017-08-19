from rest_framework import serializers

from bookmarks.models import Bookmark

class BookmarkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bookmark
        fields = ('id', 'name', 'url')

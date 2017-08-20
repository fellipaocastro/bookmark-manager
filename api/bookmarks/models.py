from django.db import models

class Bookmark(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField(max_length=200)
    owner = models.ForeignKey(
        'auth.User', related_name='bookmarks', on_delete=models.CASCADE, blank=True)

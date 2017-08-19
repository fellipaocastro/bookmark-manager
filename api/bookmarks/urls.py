from django.conf.urls import url
from bookmarks import views

urlpatterns = [
    url(r'^bookmarks/$', views.bookmark_list),
    url(r'^bookmarks/(?P<pk>[0-9]+)/$', views.bookmark_detail),
]

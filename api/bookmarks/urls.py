from django.conf.urls import url, include

from rest_framework.urlpatterns import format_suffix_patterns

from bookmarks import views

urlpatterns = [
    url(r'^bookmarks/$', views.BookmarkList.as_view()),
    url(r'^bookmarks/(?P<pk>[0-9]+)/$', views.BookmarkDetail.as_view()),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

urlpatterns = format_suffix_patterns(urlpatterns)

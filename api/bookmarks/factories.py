from django.contrib.auth.models import User

import factory

from bookmarks.models import Bookmark


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username', 'email', 'password')

    username = factory.Sequence(lambda n: "user{}".format(n))
    email = factory.Sequence(lambda n: "email{}@example.com".format(n))
    password = factory.Sequence(lambda n: "password{}".format(n))


class AdminFactory(UserFactory):
    username = factory.Sequence(lambda n: "admin{}".format(n))
    is_staff = True


class BookmarkFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Bookmark
        django_get_or_create = ('name', 'url', 'owner')

    name = factory.Sequence(lambda n: "Bookmark {}".format(n))
    url = factory.Sequence(lambda n: "http://www.example{}.com".format(n))
    owner = UserFactory.create()

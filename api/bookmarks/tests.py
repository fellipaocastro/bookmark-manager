from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from bookmarks.models import Bookmark

class BookmarkTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super(BookmarkTestCase, cls).setUpClass()

        cls.adminuser = User.objects.create_user('admin', 'admin@test.com', 'pass')
        cls.adminuser.save()
        cls.adminuser.is_staff = True
        cls.adminuser.save()

        cls.user1 = User.objects.create_user('user1', 'user1@test.com', 'pass')
        cls.user1.save()
        cls.user1.is_staff = True
        cls.user1.save()

        cls.user2 = User.objects.create_user('user2', 'user2@test.com', 'pass')
        cls.user2.save()
        cls.user2.is_staff = True
        cls.user2.save()

        cls.bookmark1 = Bookmark(
            name="Bookmark 1", url="http://www.bookmark1.com", owner=cls.user1)
        cls.bookmark1.save()

        cls.bookmark2 = Bookmark(
            name="Bookmark 2", url="http://www.bookmark2.com", owner=cls.user2)
        cls.bookmark2.save()

    def test_admin_can_retrieve_all_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.adminuser)

        response = client.get('/bookmarks/')

        expected_response = b'''[{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2},{"id":2,"name":"Bookmark 2","url":"http://www.bookmark2.com","owner_id":3}]'''
        self.assertEqual(response.content, expected_response)

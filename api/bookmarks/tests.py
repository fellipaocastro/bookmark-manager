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

        cls.user2 = User.objects.create_user('user2', 'user2@test.com', 'pass')
        cls.user2.save()

        cls.bookmark1 = Bookmark(
            name="Bookmark 1", url="http://www.bookmark1.com", owner=cls.user1)
        cls.bookmark1.save()

        cls.bookmark2 = Bookmark(
            name="Bookmark 2", url="http://www.bookmark2.com", owner=cls.user2)
        cls.bookmark2.save()

    def test_admin_can_retrieve_list_of_all_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.adminuser)

        response = client.get('/bookmarks/')

        expected_response = b'''[{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2},{"id":2,"name":"Bookmark 2","url":"http://www.bookmark2.com","owner_id":3}]'''
        self.assertEqual(response.content, expected_response)

    def test_user_can_retrieve_list_of_its_own_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)

        response = client.get('/bookmarks/')

        expected_response = b'''[{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2}]'''
        self.assertEqual(response.content, expected_response)

    def test_user_can_retrieve_details_of_its_own_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)

        response = client.get('/bookmarks/1/')

        expected_response = b'''{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2}'''
        self.assertEqual(response.content, expected_response)

    def test_user_cannot_retrieve_details_of_others_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)

        response = client.get('/bookmarks/2/')

        expected_response = b'{"detail":"Not found."}'
        self.assertEqual(response.content, expected_response)

    def test_user_can_create_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)

        data = {'name': 'Bookmark 3', 'url': 'http://www.bookmark3.com'}
        response = client.post('/bookmarks/', data, format='json')

        expected_status_code = 201
        self.assertEqual(response.status_code, expected_status_code)

    def test_user_can_update_details_of_its_own_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user2)

        data = {'name': 'Bookmark 21', 'url': 'http://www.bookmark21.com'}
        response = client.put('/bookmarks/2/', data, format='json')

        expected_response = b'''{"id":2,"name":"Bookmark 21","url":"http://www.bookmark21.com",\
"owner_id":3}'''
        self.assertEqual(response.content, expected_response)

    def test_user_cannot_update_details_of_others_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)

        data = {'name': 'Bookmark 21', 'url': 'http://www.bookmark21.com'}
        response = client.put('/bookmarks/2/', data, format='json')

        expected_response = b'{"detail":"Not found."}'
        self.assertEqual(response.content, expected_response)

    def test_user_can_delete_its_own_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user2)

        response = client.delete('/bookmarks/2/')

        expected_status_code = 204
        self.assertEqual(response.status_code, expected_status_code)

    def test_user_cannot_delete_others_bookmarks(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)

        response = client.put('/bookmarks/2/')

        expected_response = b'{"detail":"Not found."}'
        self.assertEqual(response.content, expected_response)

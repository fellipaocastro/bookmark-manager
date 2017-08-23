from django.test import TestCase

from rest_framework.test import APIClient

from bookmarks.factories import UserFactory, AdminFactory, BookmarkFactory


class BookmarkTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super(BookmarkTestCase, cls).setUpClass()

        cls.admin = AdminFactory.create()
        cls.user1 = UserFactory.create(username='user1')
        cls.user2 = UserFactory.create(username='user2')

        cls.bookmark1 = BookmarkFactory(
            name="Bookmark 1", url="http://www.bookmark1.com", owner=cls.user1)

        cls.bookmark2 = BookmarkFactory(
            name="Bookmark 2", url="http://www.bookmark2.com", owner=cls.user2)

    def setUp(self):
        self.client = APIClient()

    def test_admin_can_retrieve_list_of_all_users(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get('/users/')

        expected_response = b'''[{"id":1,"username":"admin","is_staff":true},\
{"id":2,"username":"user1","is_staff":false},\
{"id":3,"username":"user2","is_staff":false}]'''
        self.assertEqual(response.content, expected_response)

    def test_admin_can_retrieve_details_of_a_user(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get('/users/2/')

        expected_response = b'{"id":2,"username":"user1","is_staff":false}'
        self.assertEqual(response.content, expected_response)

    def test_admin_can_retrieve_list_of_all_bookmarks(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get('/bookmarks/')

        expected_response = b'''[{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2,"owner_username":"user1"},{"id":2,"name":"Bookmark 2",\
"url":"http://www.bookmark2.com","owner_id":3,"owner_username":"user2"}]'''
        self.assertEqual(response.content, expected_response)

    def test_user_cannot_retrieve_list_of_all_users(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get('/users/')

        expected_response = b'{"detail":"You do not have permission to perform this action."}'
        self.assertEqual(response.content, expected_response)

    def test_user_cannot_retrieve_details_of_a_user(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get('/users/3/')

        expected_response = b'{"detail":"You do not have permission to perform this action."}'
        self.assertEqual(response.content, expected_response)

    def test_user_can_retrieve_list_of_its_own_bookmarks(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get('/bookmarks/')

        expected_response = b'''[{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2,"owner_username":"user1"}]'''

        self.assertEqual(response.content, expected_response)

    def test_user_can_retrieve_details_of_its_own_bookmarks(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get('/bookmarks/1/')

        expected_response = b'''{"id":1,"name":"Bookmark 1","url":"http://www.bookmark1.com",\
"owner_id":2,"owner_username":"user1"}'''
        self.assertEqual(response.content, expected_response)

    def test_user_cannot_retrieve_details_of_others_bookmarks(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get('/bookmarks/2/')

        expected_response = b'{"detail":"Not found."}'
        self.assertEqual(response.content, expected_response)

    def test_user_can_create_bookmarks(self):
        self.client.force_authenticate(user=self.user1)

        data = {'name': 'Bookmark 3', 'url': 'http://www.bookmark3.com'}
        response = self.client.post('/bookmarks/', data, format='json')

        expected_status_code = 201
        self.assertEqual(response.status_code, expected_status_code)

    def test_user_can_update_details_of_its_own_bookmarks(self):
        self.client.force_authenticate(user=self.user2)

        data = {'name': 'Bookmark 21', 'url': 'http://www.bookmark21.com'}
        response = self.client.put('/bookmarks/2/', data, format='json')

        expected_response = b'''{"id":2,"name":"Bookmark 21","url":"http://www.bookmark21.com",\
"owner_id":3,"owner_username":"user2"}'''
        self.assertEqual(response.content, expected_response)

    def test_user_cannot_update_details_of_others_bookmarks(self):
        self.client.force_authenticate(user=self.user1)

        data = {'name': 'Bookmark 21', 'url': 'http://www.bookmark21.com'}
        response = self.client.put('/bookmarks/2/', data, format='json')

        expected_response = b'{"detail":"Not found."}'
        self.assertEqual(response.content, expected_response)

    def test_user_can_delete_its_own_bookmarks(self):
        self.client.force_authenticate(user=self.user2)

        response = self.client.delete('/bookmarks/2/')

        expected_status_code = 204
        self.assertEqual(response.status_code, expected_status_code)

    def test_user_cannot_delete_others_bookmarks(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.put('/bookmarks/2/')

        expected_response = b'{"detail":"Not found."}'
        self.assertEqual(response.content, expected_response)

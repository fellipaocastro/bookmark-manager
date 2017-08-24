from rest_framework import permissions


class IsPostMethodOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.request.method == 'POST' or request.user.is_staff

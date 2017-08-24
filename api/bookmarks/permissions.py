from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsPostMethodOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.request.method == 'POST' or request.user.is_staff

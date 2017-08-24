from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.user.is_staff

class IsPostMethodOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.request.method == 'POST' or request.user.is_staff

from django.urls import path, include
from .views import *

urlpatterns = [
    path("notes/", view=note_list, name="note_list"),
    path("notes/get/", view=notes, name="notes"),  # This will handle GET with query params
    path("notes/edit/", view=note_detail, name="note_detail")
]
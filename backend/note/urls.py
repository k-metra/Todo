from django.urls import path, include
from .views import *

urlpatterns = [
    path("notes/", view=note_list, name="note_list"),
    path("notes/<int:note_id>/", view=note_detail, name="note_detail")
]
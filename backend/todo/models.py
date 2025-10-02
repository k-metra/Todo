from django.db import models
from users.models import User

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500, blank=True)
    completed = models.BooleanField(default=False)

    account = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos")
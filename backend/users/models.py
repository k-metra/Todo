from django.db import models
from datetime import datetime, timedelta
import secrets 
import string


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"Session for {self.user.username} - Expires at {self.expires_at}"
    
    @classmethod
    def generate_token(self):
        letters = string.ascii_letters + string.digits
        token = ''.join(secrets.choice(letters) for i in range(64))

        return token

    @classmethod
    def create_session(cls, user, expiry=12):
        expiry_time = datetime.now() + timedelta(hours=expiry)
        token = cls.generate_token()
        
        session = cls.objects.create(
            user=user,
            session_token=token,
            expires_at=expiry_time
        )

        return session
from django.db import models
from django.contrib.auth.models import User


class Interest(models.Model):
    """A topic that the user is interested in."""

    interest = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.interest

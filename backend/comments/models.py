from django.db import models


class Interest(models.Model):
    """A topic that the user is interested in."""

    interest = models.CharField(max_length=200)

    def __str__(self):
        return self.interest

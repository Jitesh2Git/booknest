import uuid
from django.db import models

class Book(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    publish_year = models.IntegerField()
    cover_image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
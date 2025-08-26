from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publish_year', 'cover_image')
    list_filter = ('publish_year',)
    search_fields = ('title', 'author')
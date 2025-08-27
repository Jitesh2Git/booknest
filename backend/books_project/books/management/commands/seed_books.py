from django.core.management.base import BaseCommand
from books.models import Book

class Command(BaseCommand):
    help = 'Seed the database with sample books'

    def handle(self, *args, **kwargs):
        sample_books = [
            {
                "title": "The Midnight Library",
                "author": "Matt Haig",
                "description": "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
                "publish_year": 1925,
                "cover_image": "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
            },
            {
                "title": "Atomic Habits",
                "author": "James Clear",
                "description":  "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
                "publish_year": 1949,
                "cover_image": "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
            },
            {
                "title": "You Don't Know JS: Scope & Closures",
                "author": "Kyle Simpson",
                "description": "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
                "publish_year": 1960,
                "cover_image":  "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title": "The Alchemist",
                "author": "Paulo Coelho",
                "description": "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
                "publish_year": 2021,
                "cover_image": "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title":"Deep Work",
                "author": "Cal Newport",
                "description":  "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
                "publish_year": 2020,
                "cover_image": "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
            },
            {
                "title": "Clean Code",
                "author": "Robert C. Martin",
                "description":  "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
                "publish_year": 1999,
                "cover_image": "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
            },
            {
                "title":  "The Pragmatic Programmer",
                "author": "Andrew Hunt, David Thomas",
                "description":   "A timeless guide for developers to hone their skills and improve their programming practices.",
                "publish_year": 2003,
                "cover_image":"https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title": "The Psychology of Money",
                "author": "Morgan Housel",
                "description":  "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
                "publish_year": 1920,
                "cover_image":  "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title": "The Midnight Library",
                "author": "Matt Haig",
                "description": "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
                "publish_year": 2001,
                "cover_image": "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
            },
            {
                "title": "Atomic Habits",
                "author": "James Clear",
                "description":  "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
                "publish_year": 2020,
                "cover_image": "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
            },
            {
                "title": "You Don't Know JS: Scope & Closures",
                "author": "Kyle Simpson",
                "description": "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
                "publish_year": 2001,
                "cover_image":  "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title": "The Alchemist",
                "author": "Paulo Coelho",
                "description": "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
                "publish_year": 1999,
                "cover_image": "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title":"Deep Work",
                "author": "Cal Newport",
                "description":  "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
                "publish_year": 1920,
                "cover_image": "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
            },
            {
                "title": "Clean Code",
                "author": "Robert C. Martin",
                "description":  "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
                "publish_year": 2000,
                "cover_image": "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
            },
            {
                "title":  "The Pragmatic Programmer",
                "author": "Andrew Hunt, David Thomas",
                "description":   "A timeless guide for developers to hone their skills and improve their programming practices.",
                "publish_year": 2006,
                "cover_image":"https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
            },
            {
                "title": "The Psychology of Money",
                "author": "Morgan Housel",
                "description":  "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
                "publish_year": 2001,
                "cover_image":  "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
            },
        ]

        for book_data in sample_books:
            Book.objects.create(**book_data)

        self.stdout.write(self.style.SUCCESS(f'{len(sample_books)} books seeded successfully!'))
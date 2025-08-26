import graphene
from graphene_django import DjangoObjectType
from .models import Book
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist, ValidationError


# <---- GraphQL Type ------ >
class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = "__all__"


# Wrapper for all_books response
class BookListResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    message = graphene.String()
    books = graphene.List(BookType)


# Wrapper for single book response
class BookResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    message = graphene.String()
    book = graphene.Field(BookType)


# <---- Queries ------ >
class Query(graphene.ObjectType):
    all_books = graphene.Field(
        BookListResponse,
        search=graphene.String(),
        skip=graphene.Int(),
        first=graphene.Int()
    )
    book = graphene.Field(BookResponse, id=graphene.UUID(required=True))

    def resolve_all_books(root, info, search=None, skip=None, first=None):
        try:
            qs = Book.objects.all()

            if search:
                qs = qs.filter(
                    Q(title__icontains=search) | Q(author__icontains=search)
                )
                if not qs.exists():
                    return BookListResponse(
                        ok=False,
                        message=f"No books found matching '{search}'.",
                        books=[]
                    )

            if skip:
                qs = qs[skip:]
            if first:
                qs = qs[:first]

            if not qs.exists():
                return BookListResponse(
                    ok=False,
                    message="No books in database.",
                    books=[]
                )

            return BookListResponse(
                ok=True,
                message="Books fetched successfully.",
                books=qs
            )
        except Exception as e:
            return BookListResponse(
                ok=False,
                message=f"Failed to fetch books: {str(e)}",
                books=[]
            )

    def resolve_book(root, info, id):
        try:
            book = Book.objects.get(pk=id)
            return BookResponse(
                ok=True,
                message="Book fetched successfully.",
                book=book
            )
        except ObjectDoesNotExist:
            return BookResponse(
                ok=False,
                message=f"Book with id '{id}' does not exist.",
                book=None
            )
        except Exception as e:
            return BookResponse(
                ok=False,
                message=f"Failed to fetch book: {str(e)}",
                book=None
            )
        

# <---- Mutations ------ >
# Add Book
class CreateBook(graphene.Mutation):
    ok = graphene.Boolean()
    message = graphene.String()
    book = graphene.Field(BookType)

    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)
        description = graphene.String(required=True)
        publish_year = graphene.Int(required=True)
        cover_image = graphene.String(required=False)

    def mutate(root, info, title, author, description, publish_year, cover_image=None):
        try:
            book = Book(
                title=title,
                author=author,
                description=description,
                publish_year=publish_year,
                cover_image=cover_image
            )
            book.full_clean()
            book.save()

            return CreateBook(
                ok=True,
                message="Book created successfully.",
                book=book
            )
        except ValidationError as ve:
            errors = "; ".join([f"{field}: {', '.join(errs)}" for field, errs in ve.message_dict.items()])
            return CreateBook(
                ok=False,
                message=f"Validation error(s): {errors}",
                book=None
            )
        except Exception as e:
            return CreateBook(
                ok=False,
                message=f"Failed to create book: {str(e)}",
                book=None
            )


# Update Book
class UpdateBook(graphene.Mutation):
    ok = graphene.Boolean()
    message = graphene.String()
    book = graphene.Field(BookType)

    class Arguments:
        id = graphene.UUID(required=True)
        title = graphene.String()
        author = graphene.String()
        description = graphene.String()
        publish_year = graphene.Int()
        cover_image = graphene.String()

    def mutate(root, info, id, **kwargs):
        try:
            book = Book.objects.get(pk=id)

            for key, value in kwargs.items():
                setattr(book, key, value)

            book.full_clean()
            book.save()

            return UpdateBook(
                ok=True,
                message="Book updated successfully.",
                book=book
            )

        except ObjectDoesNotExist:
            return UpdateBook(
                ok=False,
                message=f"Book with id {id} does not exist.",
                book=None
            )
        except ValidationError as ve:
            errors = [f"{field}: {', '.join(errs)}" for field, errs in ve.message_dict.items()]
            return UpdateBook(
                ok=False,
                message="; ".join(errors),
                book=None
            )
        except Exception as e:
            return UpdateBook(
                ok=False,
                message=str(e),
                book=None
            )


# Delete Book
class DeleteBook(graphene.Mutation):
    ok = graphene.Boolean()
    message = graphene.String()
    errors = graphene.List(graphene.String)

    class Arguments:
        id = graphene.UUID(required=True)

    def mutate(root, info, id):
        errors = []
        try:
            book = Book.objects.get(pk=id)
            book.delete()
            return DeleteBook(ok=True, message=f"Book deleted successfully.", errors=None)
        except ObjectDoesNotExist:
            errors.append(f"Book with id {id} does not exist.")
        except Exception as e:
            errors = [str(e)]
        return DeleteBook(ok=False, message=None, errors=errors)


# <---- Mutation Object ------ >
class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()
    update_book = UpdateBook.Field()
    delete_book = DeleteBook.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
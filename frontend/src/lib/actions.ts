import axios from "axios";
import type {
  AddBookInput,
  AllBooksResponse,
  BookResponse,
  DeleteBookResponse,
  UpdateBookInput,
} from "./types";
import { API_URL } from "./env";

export const fetchAllBooks = async (
  skip: number = 0,
  first: number = 12,
  search: string = ""
): Promise<AllBooksResponse | null> => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        query ($search: String, $skip: Int, $first: Int) {
            allBooks(search: $search, skip: $skip, first: $first) {
              ok
              message
              books {
                id
                title
                author
                description
                publishYear
                coverImage
              }
           }
        } 
      `,
      variables: {
        skip,
        first,
        search: search || null,
      },
    });

    return response.data.data.allBooks;
  } catch (error) {
    console.error("Error in fetchBooks", error);
    return null;
  }
};

export const fetchBookById = async (
  id: string
): Promise<BookResponse | null> => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        query ($id: UUID!) {
          book(id: $id) {
            ok
            message
            book {
              id
              title
              author
              description
              publishYear
              coverImage
            }
          }
        }
      `,
      variables: { id },
    });

    return response.data.data.book;
  } catch (error) {
    console.error("Error in fetchBookById:", error);
    return null;
  }
};

export const updateBook = async (
  input: UpdateBookInput
): Promise<BookResponse | null> => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation UpdateBook(
          $id: UUID!, 
          $title: String, 
          $author: String, 
          $description: String, 
          $publish_year: Int, 
          $cover_image: String
        ) {
          updateBook(
            id: $id, 
            title: $title, 
            author: $author, 
            description: $description, 
            publishYear: $publish_year, 
            coverImage: $cover_image
          ) {
            ok
            message
            book {
              id
              title
              author
              description
              publishYear
              coverImage
            }
          }
        }
      `,
      variables: {
        id: input.id,
        title: input.title || null,
        author: input.author || null,
        description: input.description || null,
        publish_year: input.publishYear || null,
        cover_image: input.coverImage || null,
      },
    });

    return response.data.data.updateBook;
  } catch (error) {
    console.error("Error in updateBook:", error);
    return null;
  }
};

export const deleteBook = async (id: string): Promise<DeleteBookResponse> => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation DeleteBook($id: UUID!) {
          deleteBook(id: $id) {
            ok
            message
            errors
          }
        }
      `,
      variables: { id },
    });

    return response.data.data.deleteBook;
  } catch (error: unknown) {
    console.error("Error in deleteBook:", error);
    return {
      ok: false,
      message: "Failed to delete book",
      errors: [(error as Error)?.message || "Unknown error"],
    };
  }
};

export const addBook = async (
  input: AddBookInput
): Promise<BookResponse | null> => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation CreateBook(
          $title: String!, 
          $author: String!, 
          $description: String!, 
          $publish_year: Int!, 
          $cover_image: String
        ) {
          createBook(
            title: $title, 
            author: $author, 
            description: $description, 
            publishYear: $publish_year, 
            coverImage: $cover_image
          ) {
            ok
            message
            book {
              id
              title
              author
              description
              publishYear
              coverImage
            }
          }
        }
      `,
      variables: {
        title: input.title,
        author: input.author,
        description: input.description,
        publish_year: input.publishYear,
        cover_image: input.coverImage || null,
      },
    });

    return response.data.data.createBook;
  } catch (error) {
    console.error("Error in addBook:", error);
    return null;
  }
};

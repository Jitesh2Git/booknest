import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publishYear: number;
  coverImage?: string;
}

export interface BookListProps {
  title: string | ReactNode;
  books: Book[];
  className?: string;
}

export type BookCoverVariant = "regular" | "medium" | "wide";

export const variantStyles: Record<BookCoverVariant, string> = {
  regular: "book-cover_regular",
  medium: "book-cover_medium",
  wide: "book-cover_wide",
};

export interface BookCoverProps {
  className?: string;
  variant?: BookCoverVariant;
  coverColor?: string;
  coverImage?: string;
}

export interface AllBooksResponse {
  ok: boolean;
  message: string;
  books: Book[];
}

export interface BookResponse {
  ok: boolean;
  message: string;
  book: Book | null;
}

export interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxButtons?: number;
  className?: string;
}

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: string;
  description?: string;
  publishYear?: number;
  coverImage?: string;
}

export interface BookOverviewModalProps {
  book: Book | null;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

export interface DeleteBookResponse {
  ok: boolean;
  message: string | null;
  errors: string[] | null;
}

export interface AddBookInput {
  title: string;
  author: string;
  description: string;
  publishYear: number;
  coverImage?: string;
}

export interface AddBookModalProps {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

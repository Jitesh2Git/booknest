import type { BookListProps } from "@/lib/types";
import BookCard from "./BookCard";

const BookList = ({ title, books, className }: BookListProps) => {
  return (
    <section className={className}>
      <h2 className="font-bebas text-4xl text-custom-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;

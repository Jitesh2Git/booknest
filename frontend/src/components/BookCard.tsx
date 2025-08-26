import { Link, useLocation } from "react-router-dom";
import BookCover from "./BookCover";
import type { Book } from "@/lib/types";

const BookCard = ({ id, title, author, coverImage }: Book) => {
  const location = useLocation();

  return (
    <li>
      <Link to={`/book/${id}`} state={{ from: location.pathname }}>
        <BookCover coverImage={coverImage} variant="medium" className="!h-53" />

        <div className="mt-4 min-[480px]:max-w-40">
          <p className="book-title">{title}</p>
          <p className="book-author">{author}</p>
        </div>
      </Link>
    </li>
  );
};

export default BookCard;

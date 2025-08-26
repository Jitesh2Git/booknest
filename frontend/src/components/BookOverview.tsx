import type { Book, BookOverviewModalProps } from "@/lib/types";
import BookCover from "./BookCover";
import { Button } from "./ui/button";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookUpdateModal from "./BookUpdateModal";
import DeleteBookDialog from "./DeleteBookDialog";
import { useLocation, useNavigate } from "react-router-dom";

const BookOverview = ({ book, setBook }: BookOverviewModalProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!book) return;
    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    setIsFavorite(favs.some((b: Book) => b.id === book.id));
  }, [book]);

  if (!book)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
        <BookOpen className="h-12 w-12 text-custom-primary" />

        <h2 className="text-3xl font-bold text-white">Book Not Found</h2>
        <p className="text-custom-light-100 max-w-sm">
          The book you are looking for doesn’t exist. Try browsing other books.
        </p>
        <Button className="btn" onClick={() => navigate("/")}>
          <p className="font-bebas text-xl text-custom-dark-100">
            Back to Home
          </p>
        </Button>
      </div>
    );

  const { id, title, author, description, publishYear, coverImage } = book;

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favourites") || "[]");

    if (isFavorite) {
      favs = favs.filter((b: Book) => b.id !== id);
      toast.success("Removed from Favourites", {
        style: {
          color: "var(--custom-dark-200)",
          backgroundColor: "var(--custom-green-500)",
        },
      });
    } else {
      favs.push(book);
      toast.success("Added to Favourites", {
        style: {
          color: "var(--custom-dark-200)",
          backgroundColor: "var(--custom-green-500)",
        },
      });
    }

    localStorage.setItem("favourites", JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Button className="btn mb-6 sm:mb-4" onClick={() => navigate(from)}>
        <ArrowLeft className="h-4 w-4" />
        <p className="font-bebas text-xl text-custom-dark-100">Back</p>
      </Button>

      <div className="book-overview">
        <div className="flex flex-1 flex-col gap-5">
          <h1>{title}</h1>

          <div className="book-info">
            <p>
              By{" "}
              <span className="font-semibold text-custom-light-200">
                {author}
              </span>
            </p>

            <p>
              Year Published:{" "}
              <span className="font-semibold text-custom-light-200">
                {publishYear}
              </span>
            </p>
          </div>

          <p className="book-description">{description}</p>

          <div className="flex flex-wrap gap-3">
            <BookUpdateModal book={book} setBook={setBook} />

            <DeleteBookDialog bookId={book.id} />

            <Button className="btn" onClick={toggleFavorite}>
              <Star className="h-4 w-4" />
              <p className="font-bebas text-xl text-custom-dark-100">
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </p>
            </Button>
          </div>
        </div>

        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <BookCover
              variant="wide"
              className="z-10"
              coverImage={coverImage}
            />

            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover variant="wide" coverImage={coverImage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookOverview;

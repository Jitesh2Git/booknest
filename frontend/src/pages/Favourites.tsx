import { useEffect, useState } from "react";
import BookList from "@/components/BookList";
import CustomPagination from "@/components/CustomPagination";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Favourites = () => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 12;
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);

  useEffect(() => {
    const favs: Book[] = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(favs);
    setTotalPages(Math.ceil(favs.length / booksPerPage));
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    setCurrentBooks(favourites.slice(start, end));
  }, [currentPage, favourites]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (favourites.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
        <Star className="h-12 w-12 text-custom-primary" />

        <h2 className="text-3xl font-bold text-white">
          No Favourite Books Yet
        </h2>
        <p className="text-custom-light-100 max-w-sm">
          You haven’t added any books to your favourites. Start exploring and
          add some!
        </p>
        <Button className="btn" onClick={() => navigate("/")}>
          <p className="font-bebas text-xl text-custom-dark-100">
            Browse Books
          </p>
        </Button>
      </div>
    );

  return (
    <>
      <BookList
        title="Favourite Books"
        books={currentBooks}
        className="mt-16 sm:mt-28"
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxButtons={3}
      />
    </>
  );
};

export default Favourites;

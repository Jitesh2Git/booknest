import { useEffect, useState, useCallback } from "react";
import BookList from "@/components/BookList.tsx";
import { fetchAllBooks } from "@/lib/actions.ts";
import type { Book, AllBooksResponse } from "@/lib/types.ts";
import spinner from "@/assets/spinner.svg";
import Search from "@/components/Search.tsx";
import CustomPagination from "@/components/CustomPagination.tsx";
import AddBookModal from "@/components/AddBookModal";
import { BookOpen } from "lucide-react";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const booksPerPage = 12;

  const fetchBooks = useCallback(
    async (page: number, search: string = "") => {
      setLoading(true);
      try {
        const skip = (page - 1) * booksPerPage;
        const res: AllBooksResponse | null = await fetchAllBooks(
          skip,
          booksPerPage + 1,
          search
        );

        if (res?.ok) {
          const fetchedBooks = res.books.slice(0, booksPerPage);
          setBooks(fetchedBooks);

          const nextExists = res.books.length > booksPerPage;
          setTotalPages(page + (nextExists ? 1 : 0));
          if (!nextExists) setTotalPages(page);
        } else {
          setBooks([]);
          setTotalPages(0);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    },
    [booksPerPage]
  );

  useEffect(() => {
    fetchBooks(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchBooks, refresh]);

  const handleSearch = useCallback(
    (term: string) => {
      if (term !== searchTerm) {
        setSearchTerm(term);
        setCurrentPage(1);
      }
    },
    [searchTerm]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTitle = () => {
    return (
      <div className="flex justify-between items-center w-full">
        {searchTerm ? (
          <span>
            Search Results for{" "}
            <span className="text-custom-primary">"{searchTerm}"</span>
          </span>
        ) : (
          <span>All Books</span>
        )}

        {!searchTerm && (
          <AddBookModal refresh={refresh} setRefresh={setRefresh} />
        )}
      </div>
    );
  };

  return (
    <div>
      <Search onSearch={handleSearch} />

      {loading ? (
        <div className="flex items-center justify-center my-72">
          <img
            src={spinner}
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
          <BookOpen className="h-12 w-12 text-custom-primary" />

          <h2 className="text-3xl font-bold text-white">No Books Found</h2>

          <p className="text-custom-light-100 max-w-sm">
            {searchTerm
              ? `No books match "${searchTerm}". Try a different search term.`
              : "There are no books in the library yet. Add one to get started!"}
          </p>
          {!searchTerm && (
            <AddBookModal refresh={refresh} setRefresh={setRefresh} />
          )}
        </div>
      ) : (
        <>
          <BookList
            title={getTitle()}
            books={books}
            className="mt-16 sm:mt-28"
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxButtons={3}
          />
        </>
      )}

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxButtons={3}
      />
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "@/lib/actions";
import type { Book } from "@/lib/types";
import BookOverview from "@/components/BookOverview";
import spinner from "@/assets/spinner.svg";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) return;

    const getBook = async () => {
      setLoading(true);
      try {
        const res = await fetchBookById(id);
        setBook(res?.book || null);
      } catch (err) {
        console.error("Error fetching book:", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [id]);

  return (
    <section>
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
      ) : (
        <BookOverview book={book} setBook={setBook} />
      )}
    </section>
  );
};

export default BookDetails;

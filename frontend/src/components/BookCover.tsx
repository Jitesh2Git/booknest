import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { variantStyles, type BookCoverProps } from "@/lib/types";

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <img
          src={coverImage || "https://placehold.co/400x600.png"}
          alt="Book cover"
          className="rounded-sm object-fill"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BookCover;

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { CustomPaginationProps } from "@/lib/types";

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxButtons = 3,
  className,
}: CustomPaginationProps) => {
  const renderPaginationItems = () => {
    const items = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + maxButtons - 1;

    if (totalPages && endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            className={cn(
              "cursor-pointer hover:bg-custom-primary",
              currentPage === i
                ? "bg-custom-primary text-custom-dark-100"
                : "bg-custom-dark-300 text-custom-light-100"
            )}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "flex justify-end max-[480px]:justify-center mt-10 text-custom-light-100",
        className
      )}
    >
      <div>
        <Pagination>
          <PaginationContent className="gap-x-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={cn(
                  "cursor-pointer hover:bg-custom-primary",
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                )}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                className={cn(
                  "cursor-pointer hover:bg-custom-primary",
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CustomPagination;

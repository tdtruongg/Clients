import { ChevronRight, ChevronLeft } from "lucide-react";
import classNames from "classnames";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-1">
        <button
          className={classNames(
            "w-10 h-10 flex items-center justify-center rounded-md border",
            {
              "border-gray-200 text-gray-400 cursor-not-allowed":
                currentPage === 1,
              "border-gray-300 hover:bg-gray-100 cursor-pointer":
                currentPage !== 1,
            }
          )}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
          <span className="sr-only">Trước</span>
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={classNames(
                "w-10 h-10 flex items-center justify-center rounded-md",
                {
                  "bg-emerald-600 text-white": currentPage === pageNumber,
                  "border border-gray-300 hover:bg-gray-100":
                    currentPage !== pageNumber,
                }
              )}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={classNames(
            "w-10 h-10 flex items-center justify-center rounded-md border",
            {
              "border-gray-200 text-gray-400 cursor-not-allowed":
                currentPage === totalPages,
              "border-gray-300 hover:bg-gray-100 cursor-pointer":
                currentPage !== totalPages,
            }
          )}
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
          <span className="sr-only">Tiếp</span>
        </button>
      </nav>
    </div>
  );
}

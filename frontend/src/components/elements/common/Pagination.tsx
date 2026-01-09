import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number; // Assumes 1-based index from Frontend
  onPageChange: (page: number) => void;
}

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount <= 1) return null;

  const getPageRange = () => {
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = 1; i <= pagesCount; i++) {
      if (
        i === 1 ||
        i === pagesCount ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  return (
    <nav className="flex items-center justify-center space-x-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageRange().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-slate-400">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[40px] h-10 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                isCurrent
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-500 hover:text-cyan-600"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesCount}
        className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

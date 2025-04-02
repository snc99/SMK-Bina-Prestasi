interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          page === 1
            ? "bg-gray-200 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-md hover:shadow-lg" // Style untuk aktif
        }`}
      >
        &larr;
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-1 rounded-md transition-all duration-200 ${
            page === pageNumber
              ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md" // Style untuk halaman aktif
              : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-blue-900 shadow-md hover:shadow-lg" // Style untuk halaman tidak aktif
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          page === totalPages
            ? "bg-gray-200 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-md hover:shadow-lg" // Style untuk aktif
        }`}
      >
        &rarr;
      </button>
    </div>
  );
}

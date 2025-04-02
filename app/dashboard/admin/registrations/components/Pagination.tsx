// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface PaginationProps {
//   page: number;
//   totalPages: number;
//   onPageChange: (newPage: number) => void;
// }

// const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
//   if (totalPages <= 1) return null; // Jika hanya 1 halaman, sembunyikan pagination

//   // Fungsi untuk membatasi jumlah halaman yang ditampilkan
//   const getDisplayedPages = () => {
//     const maxPagesToShow = 5; // Menampilkan max 5 angka
//     if (totalPages <= maxPagesToShow) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }

//     const pages = [];
//     const startPage = Math.max(1, page - 2);
//     const endPage = Math.min(totalPages, page + 2);

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className="flex justify-center items-center gap-2 mt-4">
//       {/* Prev Button */}
//       <button
//         onClick={() => onPageChange(page - 1)}
//         disabled={page <= 1}
//         className={`p-2 rounded-md transition-all ${
//           page <= 1
//             ? "text-gray-400 cursor-not-allowed"
//             : "text-gray-700 hover:text-black"
//         }`}
//       >
//         <ChevronLeft size={28} />
//       </button>

//       {/* Page Numbers */}
//       {getDisplayedPages().map((pageNum) => (
//         <button
//           key={pageNum}
//           onClick={() => onPageChange(pageNum)}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
//             page === pageNum
//               ? "bg-gray-700 text-white"
//               : "text-gray-800 hover:bg-gray-300 hover:text-black"
//           }`}
//         >
//           {pageNum}
//         </button>
//       ))}

//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(page + 1)}
//         disabled={page >= totalPages}
//         className={`p-2 rounded-md transition-all ${
//           page >= totalPages
//             ? "text-gray-400 cursor-not-allowed"
//             : "text-gray-700 hover:text-black"
//         }`}
//       >
//         <ChevronRight size={28} />
//       </button>
//     </div>
//   );
// };

// export default Pagination;

interface PaginationProps {
  page: number; // Halaman saat ini
  totalPages: number; // Total halaman
  onPageChange: (newPage: number) => void; // Fungsi untuk mengganti halaman
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Fungsi untuk menghasilkan array nomor halaman
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Tombol Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1} // Disable jika di halaman pertama
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          page === 1
            ? "bg-gray-200 cursor-not-allowed opacity-50" // Style untuk disabled
            : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-md hover:shadow-lg" // Style untuk aktif
        }`}
      >
        &larr; {/* Icon arrow kiri */}
      </button>

      {/* Nomor Halaman */}
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

      {/* Tombol Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages} // Disable jika di halaman terakhir
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          page === totalPages
            ? "bg-gray-200 cursor-not-allowed opacity-50" // Style untuk disabled
            : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-md hover:shadow-lg" // Style untuk aktif
        }`}
      >
        &rarr; {/* Icon arrow kanan */}
      </button>
    </div>
  );
}

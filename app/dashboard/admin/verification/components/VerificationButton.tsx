// "use client";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { mutate } from "swr";

// interface VerificationButtonProps {
//   id: string;
//   action: "verify" | "reject";
// }

// export default function VerificationButton({
//   id,
//   action,
// }: VerificationButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = async () => {
//     setIsLoading(true);

//     try {
//       const endpoint =
//         action === "verify" ? "/api/admin/verify" : "/api/admin/reject";

//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success(data.message);

//         mutate(
//           "/api/admin/unverified",
//           (currentData: any[] | undefined) =>
//             (currentData || []).filter((student) => student.id !== id),

//           false
//         );

//         mutate("/api/admin/unverified");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Terjadi kesalahan.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={`px-3 py-1 text-xs rounded flex items-center justify-center gap-2 font-semibold ${
//         action === "verify"
//           ? "bg-green-200 text-green-800 border-green-800 hover:bg-green-300 active:bg-green-400 border"
//           : "bg-red-200 text-red-800 border-red-800 hover:bg-red-300 active:bg-red-400 border"
//       } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//       disabled={isLoading}
//     >
//       {isLoading ? (
//         <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
//       ) : action === "verify" ? (
//         "Verifikasi"
//       ) : (
//         "Tolak"
//       )}
//     </button>
//   );
// }

"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { verifyStudent } from "../actions/verifyStudent";
import { rejectStudent } from "../actions/rejectStudent";


interface VerificationButtonProps {
  id: string;
  action: "verify" | "reject";
  onClick?: () => void; // Tambahkan props ini untuk menghindari error
}

export default function VerificationButton({
  id,
  action,
  onClick,
}: VerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    const result =
      action === "verify" ? await verifyStudent(id) : await rejectStudent(id);

    if (result.success) {
      toast.success(result.message);

      // Perbarui data di SWR agar langsung berubah di UI
      mutate("/api/admin/unverified", (currentData: any[] | undefined) =>
        (currentData || []).filter((student) => student.id !== id)
      );

      if (onClick) onClick(); // Panggil onClick jika ada
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 text-xs rounded flex items-center justify-center gap-2 font-semibold ${
        action === "verify"
          ? "bg-green-200 text-green-800 border-green-800 hover:bg-green-300 active:bg-green-400 border"
          : "bg-red-200 text-red-800 border-red-800 hover:bg-red-300 active:bg-red-400 border"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      ) : action === "verify" ? (
        "Verifikasi"
      ) : (
        "Tolak"
      )}
    </button>
  );
}

"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { updateSelectionStatus } from "../actions/fetchStudents";

interface SelectionButtonProps {
  studentId: string;
  mutate: () => void;
}

export default function SelectionButton({
  studentId,
  mutate,
}: SelectionButtonProps) {
  const [loadingStatus, setLoadingStatus] = useState<
    "LULUS" | "TIDAK LULUS" | null
  >(null);

  const handleUpdate = async (status: "LULUS" | "TIDAK LULUS") => {
    setLoadingStatus(status); // Set tombol yang loading

    try {
      const res = await updateSelectionStatus(studentId, status);

      if (res.error) {
        toast.error("Gagal memperbarui status.");
      } else {
        toast.success(`Status berhasil diubah menjadi ${status}.`);
        mutate(); // 🔄 Perbarui data setelah perubahan status
      }
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setLoadingStatus(null); // Reset loading state
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 text-xs rounded flex items-center justify-center gap-2 font-semibold ${
          loadingStatus === "LULUS"
            ? "opacity-50 cursor-not-allowed"
            : "bg-green-200 text-green-800 border-green-800 hover:bg-green-300 active:bg-green-400 border"
        }`}
        onClick={() => handleUpdate("LULUS")}
        disabled={loadingStatus !== null}
      >
        {loadingStatus === "LULUS" ? (
          <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Lulus"
        )}
      </button>

      <button
        className={`px-3 py-1 text-xs rounded flex items-center justify-center gap-2 font-semibold ${
          loadingStatus === "TIDAK LULUS"
            ? "opacity-50 cursor-not-allowed"
            : "bg-red-200 text-red-800 border-red-800 hover:bg-red-300 active:bg-red-400 border"
        }`}
        onClick={() => handleUpdate("TIDAK LULUS")}
        disabled={loadingStatus !== null}
      >
        {loadingStatus === "TIDAK LULUS" ? (
          <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Tidak Lulus"
        )}
      </button>
    </div>
  );
}

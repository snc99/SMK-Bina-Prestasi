"use client";

import { mutate } from "swr";
import { toast } from "react-toastify";
import { useState } from "react";
import { updateSelectionStatus } from "../actions/fetchStudents";

interface SelectionButtonProps {
  studentId: string;
}

export default function SelectionButton({ studentId }: SelectionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    "LULUS" | "TIDAK LULUS" | null
  >(null);

  const handleSelect = async (status: "LULUS" | "TIDAK LULUS") => {
    setIsLoading(true);
    setLoadingStatus(status);
    try {
      const result = await updateSelectionStatus(studentId, status);
      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Status seleksi berhasil diperbarui.");
      mutate("/api/students"); // Refresh data
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
      setLoadingStatus(null);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleSelect("LULUS")}
        className={`px-3 py-1 text-xs rounded flex items-center justify-center gap-2 font-semibold 
        bg-green-200 text-green-800 border-green-800 hover:bg-green-300 active:bg-green-400 border
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {loadingStatus === "LULUS" ? (
          <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Lulus"
        )}
      </button>

      <button
        onClick={() => handleSelect("TIDAK LULUS")}
        className={`px-3 py-1 text-xs rounded flex items-center justify-center gap-2 font-semibold 
        bg-red-200 text-red-800 border-red-800 hover:bg-red-300 active:bg-red-400 border
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
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

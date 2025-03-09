"use client";

import { useStudents } from "../hooks/useStudents";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import StudentTable from "./StudentTable";

export default function StudentList() {
  const { students, isLoading, isError } = useStudents();

  return (
    <div className="w-full overflow-x-auto">
      {/* Error Handling */}
      {isError && (
        <Alert variant="destructive" className="mb-4">
          <TriangleAlert className="h-5 w-5" />
          <AlertTitle>Terjadi Kesalahan</AlertTitle>
          <AlertDescription>
            Gagal mengambil data dari server. Silakan coba lagi nanti.
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center text-sm font-medium text-gray-500 py-4">
          <span className="animate-pulse">Loading...</span>
        </div>
      ) : students.length > 0 ? (
        <StudentTable students={students} />
      ) : (
        <div className="text-center text-sm text-gray-500 py-4">
          Tidak ada data siswa.
        </div>
      )}
    </div>
  );
}

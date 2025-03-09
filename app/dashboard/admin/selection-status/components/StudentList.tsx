"use client";

import { useStudents } from "../hooks/useStudents";
import StudentTable from "./StudentTable";
import ErrorServer from "@/components/error-handling/ErrorServer";
import Loading from "@/components/loading/Loading";

export default function StudentList() {
  const { students, isLoading, isError, mutate } = useStudents(); // ⬅️ Pastikan ada isError & mutate

  if (isError) return <ErrorServer />;
  if (isLoading) return <Loading />;

  return (
    <div className="w-full overflow-x-auto">
      {students.length > 0 ? (
        <StudentTable students={students} mutate={mutate} /> // ⬅️ Kirim mutate ke tabel agar bisa update data
      ) : (
        <div className="text-center text-sm text-gray-500 py-4">
          Tidak ada data siswa.
        </div>
      )}
    </div>
  );
}

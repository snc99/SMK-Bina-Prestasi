"use client";

import { useEffect } from "react";
import { useStudents } from "../hooks/useStudents";
import StudentTable from "./StudentTable";
import ErrorServer from "@/components/error-handling/ErrorServer";
import Loading from "@/components/loading/Loading";

export default function StudentList() {
  const { students, isLoading, isError } = useStudents();

  useEffect(() => {}, [students]);

  if (isError) return <ErrorServer />;
  if (isLoading) return <Loading />;

  return (
    <div className="w-full overflow-x-auto">
      {students.length > 0 ? (
        <StudentTable students={students} />
      ) : (
        <div className="text-center text-sm text-gray-500 py-4">
          Tidak ada data siswa.
        </div>
      )}
    </div>
  );
}

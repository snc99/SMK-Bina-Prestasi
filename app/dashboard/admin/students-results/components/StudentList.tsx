"use client";

import { useStudents } from "../hooks/useStudents";
import StudentTable from "./StudentTable";
import ErrorServer from "@/components/error-handling/ErrorServer";
import Loading from "@/components/loading/Loading";

export default function StudentList() {
  const { students, loading, error } = useStudents();

  if (error) return <ErrorServer />;
  if (loading) return <Loading />;

  return (
    <div>
      <StudentTable students={students} />
    </div>
  );
}

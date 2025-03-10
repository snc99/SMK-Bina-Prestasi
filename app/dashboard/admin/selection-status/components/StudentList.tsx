"use client";

import { useStudents } from "../hooks/useStudents";
import StudentTable from "./StudentTable";
import ErrorServer from "@/components/error-handling/ErrorServer";
import Loading from "@/components/loading/Loading";

export default function StudentList() {
  const { students, isLoading, isError, mutate } = useStudents();

  if (isError) return <ErrorServer />;
  if (isLoading) return <Loading />;

  return (
    <div>
      <StudentTable students={students} mutate={mutate} />
    </div>
  );
}

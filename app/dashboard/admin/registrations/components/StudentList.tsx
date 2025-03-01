"use client";

import { useStudents } from "../actions/useStudents";
import StudentTable from "./StudentTable";

export default function StudentList() {
  const { students, isLoading, isError } = useStudents();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return <StudentTable students={students} />; // ✅ Kirim langsung tanpa `.students`
}

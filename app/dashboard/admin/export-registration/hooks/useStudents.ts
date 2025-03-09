import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent";

export const useStudents = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/export-registration`,
    getStudents
  );

  // Pastikan data ada sebelum melakukan filter
  const students = data?.students || [];

  return {
    passedStudents: students.filter(
      (s: { selectionResult: string }) => s.selectionResult === "PASSED"
    ),
    failedStudents: students.filter(
      (s: { selectionResult: string }) => s.selectionResult === "FAILED"
    ),
    pendingStudents: students.filter(
      (s: { selectionResult: any }) => !s.selectionResult
    ),
    isLoading,
    isError: !!error,
    errorMessage: error?.message || null,
  };
};

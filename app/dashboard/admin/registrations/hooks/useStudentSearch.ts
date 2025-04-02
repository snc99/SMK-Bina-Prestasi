import useSWR from "swr";
import { fetchStudents } from "../actions/fetchStudents";

export function useStudentSearch(search: string, page: number, limit: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/registrations?search=${encodeURIComponent(
      search
    )}&page=${page}&limit=${limit}`,
    fetchStudents,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    students: data?.students || [],
    totalPages: data?.totalPages || 1,
    loading: isLoading,
    error,
    mutate,
  };
}

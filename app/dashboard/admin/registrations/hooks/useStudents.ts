import useSWR from "swr";
import { fetchStudents } from "../actions/fetchStudents";

export function useStudents(
  page: number = 1,
  limit: number = 10,
  search: string = ""
) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/registrations?page=${page}&limit=${limit}`,
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

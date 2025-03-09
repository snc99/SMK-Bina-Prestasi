import useSWR, { mutate } from "swr";
import { Student } from "@prisma/client";

const fetcher = async (url: string): Promise<Student[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Gagal mengambil data siswa: ${errorMessage}`);
  }
  return res.json();
};

export function useUnverifiedStudents() {
  const { data, error, isValidating } = useSWR<Student[]>(
    "/api/admin/unverified",
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 5000,
      keepPreviousData: true,
    }
  );

  return {
    students: data || [],
    isLoading: !data && !error,
    isError: !!error,
    isValidating,
    refresh: () => mutate("/api/students/unverified"),
  };
}

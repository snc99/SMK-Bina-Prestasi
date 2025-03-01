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
    "/api/students/unverified",
    fetcher,
    {
      revalidateOnFocus: true, // Pastikan data selalu update saat kembali ke halaman
      refreshInterval: 5000, // Fetch data otomatis setiap 5 detik
      keepPreviousData: true, // Mencegah loading state saat data berubah
    }
  );

  return {
    students: data || [],
    isLoading: !data && !error,
    isError: !!error,
    isValidating,
    refresh: () => mutate("/api/students/unverified"), // Untuk re-fetch manual
  };
}

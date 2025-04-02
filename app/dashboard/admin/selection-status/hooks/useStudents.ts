import useSWR from "swr";

// Fungsi fetcher untuk mengambil data dari API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useStudents = (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  // Query untuk API dengan pagination dan pencarian
  const query = `/api/admin/selection-status?page=${page}&limit=${limit}${
    search ? `&search=${encodeURIComponent(search)}` : ""
  }`;

  // Menggunakan useSWR untuk mengambil data
  const { data, error, mutate } = useSWR(query, fetcher, {
    revalidateOnFocus: false,
    fallbackData: [],
  });

  // Mengembalikan data yang diperlukan, dengan fallback jika tidak ada data
  return {
    students: data?.students || [],
    totalPages: data?.totalPages || 1,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

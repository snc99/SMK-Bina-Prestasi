import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
};

export function useStudents() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/students/list",
    fetcher
  );

  return { students: data, isLoading, isError: error, mutate };
}

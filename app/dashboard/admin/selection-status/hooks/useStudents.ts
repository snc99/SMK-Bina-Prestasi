import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useStudents() {
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/selection-status`,
    fetcher
  );

  return {
    students: data?.students || [],
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
}

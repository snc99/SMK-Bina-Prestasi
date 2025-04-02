import { useState, useEffect, useCallback } from "react";

export function useUnverifiedStudents(
  page: number = 1,
  limit: number = 10
) {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const url = `/api/admin/unverified?page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();
      console.log("API Response:", data); // Debug
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  // Fungsi mutate untuk memicu pengambilan data ulang
  const mutate = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { students, totalPages, isLoading, isError, mutate };
}
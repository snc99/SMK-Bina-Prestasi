import { useState, useEffect, useCallback } from "react";

export function useStudentSearch(
  search: string,
  page: number = 1,
  limit: number = 10
) {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `/api/admin/unverified?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal mencari data");

      const data = await response.json();
      console.log("API Response (useStudentSearch):", data); // Debug
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Gagal mengambil data hasil pencarian");
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  // Fungsi mutate untuk memicu pengambilan data ulang
  const mutate = useCallback(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    if (!search.trim()) {
      setStudents([]);
      setTotalPages(1);
      return;
    }

    fetchSearchResults();
  }, [search, page, limit, fetchSearchResults]);

  return { students, totalPages, loading, error, mutate };
}

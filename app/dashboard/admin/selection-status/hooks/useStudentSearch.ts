import { useState, useEffect } from "react";

export function useStudentSearch(
  search: string,
  page: number = 1,
  limit: number = 10
) {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async (search: string, page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/selection-status?search=${search}&page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Gagal mencari data");
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(search, page);
  }, [search, page]);

  const mutate = async (): Promise<any> => {
    return fetchStudents(search, page); // Mengembalikan Promise
  };

  return {
    students,
    totalPages,
    loading,
    error,
    mutate, // Mengembalikan mutate dengan tipe Promise
  };
}

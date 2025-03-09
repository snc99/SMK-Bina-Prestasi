import { useState, useEffect } from "react";
import { fetchStudents } from "../actions/fetchStudents";

// Interface untuk data siswa
interface Student {
  id: string;
  name: string;
  nisn: string;
  ijazahNumber: string;
  schoolOrigin: string;
  major: string;
  phone: string;
  status: string;
}

// Custom hook untuk mengambil data siswa
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getStudents() {
      try {
        setLoading(true);
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }

    getStudents();
  }, []);

  return { students, loading, error };
}

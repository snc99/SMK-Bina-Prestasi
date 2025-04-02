"use client";
import useSWR from "swr";
import { fetchStudents } from "@/app/dashboard/admin/registrations/actions/fetchStudents";

// export function useStudentSearch(query: string) {
//   const { data, error, isLoading } = useSWR(
//     query ? `/api/admin/search?search=${query}` : null,
//     fetchStudents,
//     {
//       revalidateOnFocus: false,
//     }
//   );

//   console.log("🔍 API response inside useStudentSearch:", data); // Debugging

//   return {
//     students: data?.students || [],
//     loading: isLoading,
//     error,
//   };
// }

import { useState, useEffect } from "react";

export function useStudentSearch(search: string) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setStudents([]); // Kosongkan jika tidak ada pencarian
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/search?search=${search}`);
        if (!response.ok) throw new Error("Gagal mencari data");
        const data = await response.json();
        setStudents(data.students);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [search]);

  return { students, loading };
}

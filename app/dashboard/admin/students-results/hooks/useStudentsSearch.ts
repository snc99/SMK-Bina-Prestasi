"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent"; // pastikan `getStudents` disesuaikan dengan API Anda

export function useStudentSearch(
  search: string,
  page: number = 1,
  limit: number = 10
) {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Membuat query untuk URL berdasarkan search
  const query = search.trim()
    ? `/api/admin/students-result?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`
    : null;

  const {
    data,
    error: swrError,
    isLoading, // `isLoading` langsung dari `useSWR`
    mutate,
  } = useSWR(query, query ? getStudents : null);

  // Update states berdasarkan data yang diterima dari SWR
  useEffect(() => {
    if (data) {
      setStudents(data.students);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (!search.trim()) {
      setStudents([]);
      setTotalPages(1);
    }
  }, [search]);

  // Menangani error
  useEffect(() => {
    if (swrError) {
      setError("Gagal mengambil data hasil pencarian");
    } else {
      setError(null);
    }
  }, [swrError]);

  return {
    students,
    totalPages,
    loading: isLoading, // Gunakan isLoading dari useSWR
    error,
    mutate, 
  };
}

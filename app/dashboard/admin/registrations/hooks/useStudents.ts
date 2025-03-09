"use client";

import useSWR from "swr";
import { Student } from "@prisma/client";

const fetcher = async (url: string): Promise<Student[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
};

export function useStudents() {
  const { data, error, mutate } = useSWR<Student[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/list`,
    fetcher
  );

  return {
    students: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

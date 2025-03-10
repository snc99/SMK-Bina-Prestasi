"use client";

import useSWR from "swr";
import { fetchStudents } from "../actions/fetchStudents";

export function useStudents() {
  const {
    data: students,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/list", fetchStudents, {
    revalidateOnFocus: false,
  });

  return {
    students: students || [],
    loading: isLoading,
    error,
    mutate,
  };
}

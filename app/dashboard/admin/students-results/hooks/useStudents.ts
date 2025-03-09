"use client";

import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent";

export const useStudents = () => {
  const {
    data: students,
    error,
    isLoading,
  } = useSWR("/api/admin/students-result", async () => {
    const data = await getStudents();
    return data.students;
  });

  return {
    students: students || [],
    isLoading,
    isError: error,
  };
};

"use client";

import useSWR from "swr";
import { getStudents } from "../actions/fetchStudents";

export const useStudents = () => {
  const {
    data: students,
    error,
    isLoading,
  } = useSWR("/api/students", async () => {
    const data = await getStudents();
    return data.students;
  });

  return {
    students: students || [],
    isLoading,
    isError: error,
  };
};

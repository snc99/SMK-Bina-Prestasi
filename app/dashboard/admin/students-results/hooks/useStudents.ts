"use client";

import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent";

export const useStudents = () => {
  const { data, error, isLoading } = useSWR(
    "/api/admin/students-result",
    getStudents
  );

  return {
    students: error ? null : data?.students ?? [],
    loading: isLoading,
    error,
  };
};

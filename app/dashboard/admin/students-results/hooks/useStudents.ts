"use client";

import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent";

export const useStudents = (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  const query = `/api/admin/students-result?page=${page}&limit=${limit}${
    search ? `&search=${encodeURIComponent(search)}` : ""
  }`;

  const { data, error, mutate } = useSWR(query, getStudents, {
    revalidateOnFocus: false,
    // keepPreviousData: true,
  });

  return {
    students: data?.students || [],
    totalPages: data?.totalPages || 1,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

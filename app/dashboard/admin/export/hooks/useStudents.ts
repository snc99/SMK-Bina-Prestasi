"use client";

import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent";

export const useStudents = () => {
  const { data, error, isLoading } = useSWR(
    "/api/admin/export",
    getStudents
  );

  return {
    passedStudents: data?.passedStudents || [],
    failedStudents: data?.failedStudents || [],
    pendingStudents: data?.pendingStudents || [],
    isLoading,
    isError: !!error,
  };
};

export default useStudents;

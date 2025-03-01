"use client";

import useSWR from "swr";
import { getStudents } from "../actions/fetchStudent";

export const useStudents = () => {
  const { data, error, isLoading } = useSWR(
    "/api/students/export",
    async () => {
      const data = await getStudents();
      return data; // Now returning the entire response object
    }
  );

  return {
    passedStudents: data?.passedStudents || [], // Accessing passedStudents directly
    failedStudents: data?.failedStudents || [], // Accessing failedStudents directly
    pendingStudents: data?.pendingStudents || [], // Accessing pendingStudents directly
    isLoading,
    isError: error,
  };
};

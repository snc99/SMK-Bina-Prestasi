"use client";

import { useStudents } from "../hooks/useStudents";
import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import StudentTable from "./StudentTable";
import ErrorServer from "@/components/error-handling/ErrorServer";
import Loading from "@/components/loading/Loading";
import { useSearchParams, useRouter } from "next/navigation";
import { useStudentSearch } from "../hooks/useStudentSearch";
import Pagination from "./Pagination";

export default function StudentList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;
  const searchQuery = useSearchParams().get("search") || "";

  const {
    students: allStudents,
    totalPages: allTotalPages,
    isLoading: allLoading,
    isError: allError,
    mutate: allMutate,
  } = useStudents(page, limit);

  const {
    students: searchResults,
    totalPages: searchTotalPages,
    loading: searchLoading,
    error: searchError,
    mutate: searchMutate,
  } = useStudentSearch(searchQuery, page, limit);

  const currentStudents = searchQuery ? searchResults : allStudents;
  const totalPages = searchQuery ? searchTotalPages : allTotalPages;
  const loading = searchQuery ? searchLoading : allLoading;

  const emptyMessage = searchQuery
    ? "Tidak ada data yang ditemukan."
    : "Tidak ada data yang perlu diverifikasi.";

  useEffect(() => {
    const newUrl = `/dashboard/admin/selection-status?${
      searchQuery ? `search=${searchQuery}&` : ""
    }page=${page}`;
    router.push(newUrl);
  }, [page, searchQuery, router]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (allError || searchError) return <ErrorServer />;
  if (loading) return <Loading />;

  return (
    <div>
      <SearchInput placeholder="Cari Nama, NISN, atau No Ijazah" />{" "}
      {searchLoading ? (
        <Loading />
      ) : (
        <StudentTable
          students={currentStudents}
          emptyMessage={emptyMessage}
          mutate={searchQuery ? searchMutate : allMutate}
        />
      )}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

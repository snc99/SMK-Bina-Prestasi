"use client";

import { useState, useEffect } from "react";
import { useUnverifiedStudents } from "../hooks/useUnverifiedStudents";
import { useStudentSearch } from "../hooks/useStudentsSearch";
import StudentTable from "./StudentTable";
import ErrorServer from "@/components/error-handling/ErrorServer";
import Loading from "@/components/loading/Loading";
import SearchInput from "../components/SearchInput";
import { useSearchParams, useRouter } from "next/navigation";
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
    mutate: allMutate, // Ambil mutate dari useUnverifiedStudents
  } = useUnverifiedStudents(page, limit);

  const {
    students: searchResults,
    totalPages: searchTotalPages,
    loading: searchLoading,
    error: searchError,
    mutate: searchMutate, // Ambil mutate dari useStudentSearch
  } = useStudentSearch(searchQuery, page, limit);

  const currentStudents = searchQuery ? searchResults : allStudents;
  const totalPages = searchQuery ? searchTotalPages : allTotalPages;
  const loading = searchQuery ? searchLoading : allLoading;

  const emptyMessage = searchQuery
    ? "Tidak ada data yang ditemukan."
    : "Belum ada data pendaftaran.";

  // Perbarui URL saat page atau searchQuery berubah
  useEffect(() => {
    const url = `/dashboard/admin/verification?${
      searchQuery ? `search=${searchQuery}&` : ""
    }page=${page}`;
    router.push(url);
  }, [page, searchQuery, router]);

  // Reset halaman ke 1 saat searchQuery berubah
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (allError || searchError) return <ErrorServer />;
  if (loading) return <Loading />;

  return (
    <div>
      <SearchInput placeholder="Cari Nama, NISN, atau No Ijazah" />
      {searchLoading ? (
        <Loading />
      ) : (
        <StudentTable
          students={currentStudents}
          emptyMessage={emptyMessage}
          mutate={searchQuery ? searchMutate : allMutate} // Teruskan mutate yang sesuai
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

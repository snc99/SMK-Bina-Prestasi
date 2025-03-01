"use client";

import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents, updateSelectionStatus } from "../actions/fetchStudents";
import SelectionButton from "./SelectionButton";

interface Student {
  id: string;
  name: string;
  nisn: string;
  major: string;
  selectionResult: "LULUS" | "TIDAK LULUS" | null;
}

// Fetcher function untuk SWR
const fetcher = async () => {
  const data = await getStudents();
  return data.students;
};

export default function StudentTable() {
  const {
    data: students,
    error,
    isLoading,
  } = useSWR("/api/students", fetcher, {
    revalidateOnFocus: false, // Hindari refetch saat kembali ke halaman
    dedupingInterval: 10000, // Cache selama 10 detik
  });

  const handleSelect = async (id: string, status: "LULUS" | "TIDAK LULUS") => {
    const result = await updateSelectionStatus(id, status);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Status seleksi berhasil diperbarui.");
      mutate("/api/students"); // Refresh data setelah update
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1000px]">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-[50px] text-xs">No</TableHead>
            <TableHead className="w-[150px] text-xs">Nama</TableHead>
            <TableHead className="w-[120px] text-xs">NISN</TableHead>
            <TableHead className="w-[120px] text-xs">Jurusan</TableHead>
            <TableHead className="w-[150px] text-xs text-center">
              Status Seleksi
            </TableHead>
            <TableHead className="w-[200px] text-xs text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-xs">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-xs text-red-500"
              >
                Gagal memuat data.
              </TableCell>
            </TableRow>
          ) : students?.length > 0 ? (
            students.map((student: Student, index: number) => (
              <TableRow key={student.id}>
                <TableCell className="text-xs">{index + 1}</TableCell>
                <TableCell className="text-xs">{student.name}</TableCell>
                <TableCell className="text-xs">{student.nisn}</TableCell>
                <TableCell className="text-xs">{student.major}</TableCell>
                <TableCell className="text-xs text-center">
                  <div
                    className={`px-2 py-1 rounded-lg inline-block ${
                      student.selectionResult === "LULUS"
                        ? "bg-green-200 text-green-800"
                        : student.selectionResult === "TIDAK LULUS"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {student.selectionResult || "BELUM DITENTUKAN"}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-center">
                  <SelectionButton
                    studentId={student.id}
                    handleSelect={handleSelect}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-xs">
                Tidak ada data pendaftar.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

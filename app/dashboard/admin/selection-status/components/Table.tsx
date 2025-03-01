"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectionButton from "./SelectionButton";
import { useStudents } from "../hooks/useStudents";

export default function StudentTable() {
  const { students, isLoading, isError } = useStudents();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

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
          {students.length > 0 ? (
            students.map((student: any, index: number) => (
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
                  {student.selectionResult === "PENDING" && (
                    <SelectionButton studentId={student.id} />
                  )}
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

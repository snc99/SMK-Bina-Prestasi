"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStudents } from "../hooks/useStudents";

export default function StudentTable() {
  const { passedStudents, failedStudents, pendingStudents, isLoading, isError } = useStudents();

  // Gabungkan ketiga array siswa
  const students = [
    ...passedStudents,
    ...failedStudents,
    ...pendingStudents
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-2 mb-5">
        <Button className="bg-red-500 opacity-90 hover:bg-red-600" size="sm">
          Export PDF
        </Button>
        <Button
          className="bg-green-500 opacity-90 hover:bg-green-600"
          size="sm"
        >
          Export Excel
        </Button>
      </div>
      <div className="overflow-x-auto rounded-md">
        <Table className="w-full min-w-[1000px]">
          <TableHeader className="bg-gray-100 text-gray-700">
            <TableRow>
              <TableHead className="w-[50px] text-xs">No</TableHead>
              <TableHead className="w-[100px] text-xs">Nama</TableHead>
              <TableHead className="w-[100px] text-xs">NISN</TableHead>
              <TableHead className="w-[100px] text-xs">Nomor Ijazah</TableHead>
              <TableHead className="w-[100px] text-xs">Jurusan</TableHead>
              <TableHead className="w-[100px] text-xs">Nomor Telepon</TableHead>
              <TableHead className="w-[100px] text-xs">
                Status Seleksi
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
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-xs text-red-500"
                >
                  Terjadi kesalahan saat mengambil data.
                </TableCell>
              </TableRow>
            ) : students?.length > 0 ? (
              students.map((student: any, index: number) => (
                <TableRow key={student.id}>
                  <TableCell className="text-xs">{index + 1}</TableCell>
                  <TableCell className="text-xs">{student.name}</TableCell>
                  <TableCell className="text-xs">{student.nisn}</TableCell>
                  <TableCell className="text-xs">
                    {student.ijazahNumber}
                  </TableCell>
                  <TableCell className="text-xs">{student.major}</TableCell>
                  <TableCell className="text-xs">{student.phone}</TableCell>
                  <TableCell className="text-xs font-bold">
                    {student.selectionResult === "PASSED" ? (
                      <span className="text-green-600">Lulus</span>
                    ) : student.selectionResult === "FAILED" ? (
                      <span className="text-red-600">Tidak Lulus</span>
                    ) : (
                      <span className="text-gray-600">Belum Ditentukan</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-xs">
                  Tidak ada data siswa.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

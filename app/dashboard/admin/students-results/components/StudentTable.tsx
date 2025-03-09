"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentTableProps {
  students: any[]; // Data siswa
}

export default function StudentTable({ students = [] }: StudentTableProps) {
  console.log("Data students di StudentTable:", students);

  return (
    <Table className="w-full min-w-[1000px]">
      <TableHeader className="bg-gray-100 text-gray-700">
        <TableRow>
          <TableHead className="w-[50px] text-xs">No</TableHead>
          <TableHead className="w-[150px] text-xs">Nama</TableHead>
          <TableHead className="w-[150px] text-xs">NISN</TableHead>
          <TableHead className="w-[150px] text-xs">Jurusan</TableHead>
          <TableHead className="w-[150px] text-xs">Telepon</TableHead>
          <TableHead className="w-[150px] text-xs">Status Seleksi</TableHead>
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
              <TableCell className="text-xs">{student.phone}</TableCell>
              <TableCell className="text-xs font-medium uppercase tracking-wider">
                <div
                  className={`px-2 py-1 inline-block rounded-sm ${
                    student.selectionResult === "PASSED"
                      ? "bg-green-200 text-green-800"
                      : student.selectionResult === "FAILED"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {student.selectionResult === "PASSED"
                    ? "Lulus"
                    : student.selectionResult === "FAILED"
                    ? "Tidak Lulus"
                    : "Belum Ditentukan"}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-sm text-gray-500 py-4"
            >
              Tidak ada data siswa.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

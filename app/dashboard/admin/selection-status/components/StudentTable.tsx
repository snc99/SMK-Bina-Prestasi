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
import { KeyedMutator } from "swr";

interface StudentTableProps {
  students: any[];
  mutate: KeyedMutator<any>;
}

export default function StudentTable({ students, mutate }: StudentTableProps) {
  // Filter hanya yang berstatus "PENDING" atau "BELUM DITENTUKAN"
  const pendingStudents = students.filter(
    (student) =>
      student.selectionResult === "PENDING" ||
      student.selectionResult === "BELUM DITENTUKAN"
  );

  return (
    <div className="overflow-x-auto rounded-md shadow-md">
      <Table className="w-full min-w-[1000px]">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-[50px] text-xs">No</TableHead>
            <TableHead className="w-[150px] text-xs">Nama</TableHead>
            <TableHead className="w-[120px] text-xs">NISN</TableHead>
            <TableHead className="w-[120px] text-xs">Jurusan</TableHead>
            <TableHead className="w-[200px] text-xs">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingStudents.length > 0 ? (
            pendingStudents.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell className="text-xs">{index + 1}</TableCell>
                <TableCell className="text-xs">{student.name}</TableCell>
                <TableCell className="text-xs">{student.nisn}</TableCell>
                <TableCell className="text-xs">{student.major}</TableCell>
                <TableCell className="text-xs text-center">
                  <SelectionButton studentId={student.id} mutate={mutate} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-gray-500 py-4">
                Tidak ada data yang perlu diverifikasi.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

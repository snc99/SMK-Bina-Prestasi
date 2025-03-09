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
  return (
    <div className="w-full overflow-x-auto">
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
          {students.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell className="text-xs">{index + 1}</TableCell>
              <TableCell className="text-xs">{student.name}</TableCell>
              <TableCell className="text-xs">{student.nisn}</TableCell>
              <TableCell className="text-xs">{student.major}</TableCell>
              <TableCell className="text-xs text-center">
                {student.selectionResult === "PENDING" ||
                student.selectionResult === "BELUM DITENTUKAN" ? (
                  <SelectionButton studentId={student.id} mutate={mutate} />
                ) : (
                  <p className="text-red-500">Bukan Pending</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

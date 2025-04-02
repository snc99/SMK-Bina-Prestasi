"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerificationButton from "./VerificationButton";
import { verifyStudent } from "../actions/verifyStudent";
import { rejectStudent } from "../actions/rejectStudent";

interface Student {
  id: string;
  name: string;
  nisn: string;
  ijazahNumber: string;
  schoolOrigin: string;
  major: string;
  phone: string;
  status: string;
}

interface StudentTableProps {
  students?: Student[];
  mutate: () => void;
  emptyMessage?: string; 
}

export default function StudentTable({
  students = [],
  emptyMessage = "Belum ada data pendaftaran", 
}: StudentTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-md shadow-md">
      <Table className="w-full min-w-[1000px]">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="text-xs">No</TableHead>
            <TableHead className="text-xs">Nama</TableHead>
            <TableHead className="text-xs">NISN</TableHead>
            <TableHead className="text-xs">Nomor Ijazah</TableHead>
            <TableHead className="text-xs">Asal Sekolah</TableHead>
            <TableHead className="text-xs">Jurusan</TableHead>
            <TableHead className="text-xs">Telepon</TableHead>
            <TableHead className="text-xs">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell className="text-xs">{index + 1}</TableCell>
                <TableCell className="text-xs">{student.name}</TableCell>
                <TableCell className="text-xs">{student.nisn}</TableCell>
                <TableCell className="text-xs">
                  {student.ijazahNumber}
                </TableCell>
                <TableCell className="text-xs">
                  {student.schoolOrigin}
                </TableCell>
                <TableCell className="text-xs">{student.major}</TableCell>
                <TableCell className="text-xs">{student.phone}</TableCell>
                <TableCell className="text-xs font-medium uppercase tracking-wider">
                  {student.status === "PENDING" && (
                    <div className="flex gap-2">
                      <VerificationButton
                        action="verify"
                        onClick={() => verifyStudent(student.id)}
                        id={student.id}
                      />
                      <VerificationButton
                        action="reject"
                        onClick={() => rejectStudent(student.id)}
                        id={student.id}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500">
                {emptyMessage} 
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@prisma/client";
interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full overflow-x-auto rounded-md">
        <Table className="w-full min-w-[1000px]">
          <TableHeader className="bg-gray-100 text-gray-700">
            <TableRow>
              <TableHead className="w-[50px] text-xs">No</TableHead>
              <TableHead className="w-[150px] text-xs">Nama</TableHead>
              <TableHead className="w-[120px] text-xs">NISN</TableHead>
              <TableHead className="w-[150px] text-xs">Nomor Ijazah</TableHead>
              <TableHead className="w-[200px] text-xs">Asal Sekolah</TableHead>
              <TableHead className="w-[150px] text-xs">Jurusan</TableHead>
              <TableHead className="w-[150px] text-xs">Telepon</TableHead>
              <TableHead className="w-[180px] text-xs">
                Status Pendaftaran
              </TableHead>
              <TableHead className="w-[180px] text-xs">
                Status Seleksi
              </TableHead>
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
                    <div
                      className={`px-2 py-1 inline-block rounded-sm ${
                        student.status === "PENDING"
                          ? "bg-yellow-200 text-yellow-800"
                          : student.status === "VERIFIED"
                          ? "bg-green-200 text-green-800"
                          : student.status === "REJECTED"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {student.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium uppercase tracking-wider">
                    <div
                      className={`px-2 py-1 inline-block rounded-sm ${
                        student.selectionResult === "PENDING"
                          ? "bg-yellow-200 text-yellow-800"
                          : student.selectionResult === "PASSED"
                          ? "bg-green-200 text-green-500"
                          : student.selectionResult === "FAILED"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {student.selectionResult}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-gray-500">
                  Belum ada pendaftar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

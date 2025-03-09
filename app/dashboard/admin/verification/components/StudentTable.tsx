"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUnverifiedStudents } from "../hooks/fetchUnverified";
import VerificationButton from "./VerificationButton";
import Loading from "@/components/loading/Loading";
import ErrorServer from "@/components/error-handling/ErrorServer";

interface VerificationButtonProps {
  id: string;
  action: "verify" | "reject";
}

export default function StudentTable() {
  const { students, isLoading, isError } = useUnverifiedStudents();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorServer />;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1000px]">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-[50px] text-xs">No</TableHead>
            <TableHead className="w-[150px] text-xs">Nama</TableHead>
            <TableHead className="w-[150px] text-xs">NISN</TableHead>
            <TableHead className="w-[150px] text-xs">Nomor Ijazah</TableHead>
            <TableHead className="w-[200px] text-xs">Asal Sekolah</TableHead>
            <TableHead className="w-[150px] text-xs">Jurusan</TableHead>
            <TableHead className="w-[150px] text-xs">Telepon</TableHead>
            <TableHead className="w-[200px] text-xs">Aksi</TableHead>
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
                      <VerificationButton id={student.id} action="verify" />
                      <VerificationButton id={student.id} action="reject" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500">
                Belum ada pendaftar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

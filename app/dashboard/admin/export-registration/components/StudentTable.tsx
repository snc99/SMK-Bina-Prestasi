import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

type Student = {
  id: string;
  name: string;
  nisn: string;
  ijazahNumber: string;
  major: string;
  phone: string;
  status: "PENDING" | "VERIFIED" | "REJECTED"; // Sesuai API
};

type StudentTableProps = {
  students: Student[];
};

export default function StudentTable({ students }: StudentTableProps) {
  console.log("Students data:", students);
  const statusLabel: Record<Student["status"], string> = {
    PENDING: "Menunggu",
    VERIFIED: "Terverifikasi",
    REJECTED: "Ditolak",
  };

  return (
    <div className="overflow-x-auto rounded-md shadow-md">
      <Table className="w-full min-w-[1000px]">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="w-[50px] text-xs text-center">No</TableHead>
            <TableHead className="w-[200px] text-xs">Nama</TableHead>
            <TableHead className="w-[150px] text-xs">NISN</TableHead>
            <TableHead className="w-[150px] text-xs">Nomor Ijazah</TableHead>
            <TableHead className="w-[200px] text-xs">Jurusan</TableHead>
            <TableHead className="w-[150px] text-xs">Nomor Telepon</TableHead>
            <TableHead className="w-[150px] text-xs text-center">
              Status Pendaftaran
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <TableRow
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="text-xs text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="text-xs">{student.name}</TableCell>
                <TableCell className="text-xs">{student.nisn}</TableCell>
                <TableCell className="text-xs">
                  {student.ijazahNumber}
                </TableCell>
                <TableCell className="text-xs">{student.major}</TableCell>
                <TableCell className="text-xs">{student.phone}</TableCell>
                <TableCell
                  className={clsx("text-xs font-bold text-center", {
                    "text-gray-600": student.status === "PENDING",
                    "text-blue-600": student.status === "VERIFIED",
                    "text-red-600": student.status === "REJECTED",
                  })}
                >
                  {statusLabel[student.status]}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-xs py-4">
                Tidak ada data siswa.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

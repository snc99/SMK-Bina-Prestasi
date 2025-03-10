import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  return (
    <div className="overflow-x-auto rounded-md shadow-md">
      <Table className="w-full min-w-[1000px]">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow>
            <TableHead className="text-xs">No</TableHead>
            <TableHead className="text-xs">Nama</TableHead>
            <TableHead className="text-xs">NISN</TableHead>
            <TableHead className="text-xs">Nomor Ijazah</TableHead>
            <TableHead className="w-[200px] text-xs">Asal Sekolah</TableHead>
            <TableHead className="text-xs">Jurusan</TableHead>
            <TableHead className="text-xs">Telepon</TableHead>
            <TableHead className="text-xs">Status Akun</TableHead>
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
                        : student.status === "REJECTED"
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {student.status}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                Belum ada data pendaftaran
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

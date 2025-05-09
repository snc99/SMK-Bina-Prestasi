// StudentTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type StudentTableProps = {
  students: any[];
};

export default function StudentTable({ students }: StudentTableProps) {
  return (
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
            <TableHead className="w-[100px] text-xs">Status Seleksi</TableHead>
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
              <TableCell colSpan={7} className="text-center text-xs">
                Tidak ada data siswa.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

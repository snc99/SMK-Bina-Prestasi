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
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

export default function StudentTable() {
  const {
    passedStudents,
    failedStudents,
    pendingStudents,
    isLoading,
    isError,
  } = useStudents();

  // Gabungkan ketiga array siswa
  const students = [...passedStudents, ...failedStudents, ...pendingStudents];

  // Fungsi untuk mengekspor data ke PDF
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("helvetica");

    // Judul PDF
    doc.setFontSize(18);
    doc.text("Laporan Data Siswa", 105, 10, { align: "center" });

    // Header Tabel
    doc.setFontSize(8); // Mengurangi ukuran font header untuk memberi ruang lebih
    doc.text("No", 20, 30);
    doc.text("Nama", 30, 30);
    doc.text("NISN", 70, 30); // Posisi NISN sedikit digeser ke kanan
    doc.text("Nomor Ijazah", 95, 30);
    doc.text("Jurusan", 125, 30); // Posisi Jurusan sedikit digeser ke kiri
    doc.text("Nomor Telepon", 170, 30);
    doc.text("Status Seleksi", 210, 30);

    let y = 40; // Initial y-position for table rows

    // Menambahkan data siswa ke dalam tabel
    students.forEach((student: any, index: number) => {
      doc.setFontSize(8); // Menggunakan ukuran font yang sedikit lebih kecil untuk data siswa
      doc.text(String(index + 1), 20, y); // Nomor
      doc.text(student.name, 30, y); // Nama
      doc.text(student.nisn, 70, y); // NISN
      doc.text(student.ijazahNumber, 95, y); // Nomor Ijazah
      doc.text(student.major, 125, y); // Jurusan

      // Nomor Telepon (Cek panjang teks, dan pastikan cukup ruang di kertas)
      const phoneText = student.phone;
      const statusText =
        student.selectionResult === "PASSED"
          ? "Lulus"
          : student.selectionResult === "FAILED"
          ? "Tidak Lulus"
          : "Belum Ditentukan";

      // Menyesuaikan posisi untuk nomor telepon dan status seleksi
      // Membungkus teks agar tidak terpotong
      doc.text(phoneText, 170, y, { maxWidth: 30 });
      doc.text(statusText, 210, y, { maxWidth: 30 });

      y += 10; // Move to the next line for the next student
    });

    // Simpan PDF
    doc.save("laporan_data_siswa.pdf");
  };

  // Fungsi untuk mengekspor data ke Excel
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      students.map((student: any, index: number) => ({
        No: index + 1,
        Nama: student.name,
        NISN: student.nisn,
        "Nomor Ijazah": student.ijazahNumber,
        Jurusan: student.major,
        "Nomor Telepon": student.phone,
        "Status Seleksi":
          student.selectionResult === "PASSED"
            ? "Lulus"
            : student.selectionResult === "FAILED"
            ? "Tidak Lulus"
            : "Belum Ditentukan",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");

    // Simpan file Excel
    XLSX.writeFile(workbook, "laporan_data_siswa.xlsx");
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-2 mb-5">
        <Button
          className="bg-red-500 opacity-90 hover:bg-red-600"
          size="sm"
          onClick={generatePDF} // Call generatePDF on button click
        >
          Export PDF
        </Button>
        <Button
          className="bg-green-500 opacity-90 hover:bg-green-600"
          size="sm"
          onClick={generateExcel} // Call generateExcel on button click
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
                <TableCell colSpan={7} className="text-center text-xs">
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
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
                <TableCell colSpan={7} className="text-center text-xs">
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

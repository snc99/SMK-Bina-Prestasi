// StudentList.tsx
"use client";

import Loading from "@/components/loading/Loading";
import { useStudents } from "../hooks/useStudents";
import StudentTable from "./StudentTable";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import ErrorServer from "@/components/error-handling/ErrorServer";

export default function StudentList() {
  const {
    passedStudents,
    failedStudents,
    pendingStudents,
    isLoading,
    isError,
  } = useStudents();

  // Gabungkan semua data siswa
  const students = [...passedStudents, ...failedStudents, ...pendingStudents];

  // Fungsi untuk export PDF
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text("Laporan Data Siswa", 105, 10, { align: "center" });
    doc.setFontSize(8);
    let y = 40;
    students.forEach((student: any, index: number) => {
      doc.text(String(index + 1), 20, y);
      doc.text(student.name, 30, y);
      doc.text(student.nisn, 70, y);
      doc.text(student.ijazahNumber, 95, y);
      doc.text(student.major, 125, y);
      doc.text(student.phone, 170, y, { maxWidth: 30 });
      doc.text(
        student.selectionResult === "PASSED"
          ? "Lulus"
          : student.selectionResult === "FAILED"
          ? "Tidak Lulus"
          : "Belum Ditentukan",
        210,
        y,
        { maxWidth: 30 }
      );
      y += 10;
    });
    doc.save("laporan_data_siswa.pdf");
  };

  // Fungsi untuk export Excel
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
    XLSX.writeFile(workbook, "laporan_data_siswa.xlsx");
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorServer />;

  return (
    <div>
      <div className="flex space-x-2 mb-5">
        <Button
          className="bg-red-500 hover:bg-red-600"
          size="sm"
          onClick={generatePDF}
        >
          Export PDF
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          size="sm"
          onClick={generateExcel}
        >
          Export Excel
        </Button>
      </div>
      <StudentTable students={students} />
    </div>
  );
}

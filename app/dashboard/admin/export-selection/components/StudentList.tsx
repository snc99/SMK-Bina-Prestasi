// StudentList.tsx
"use client";

import Loading from "@/components/loading/Loading";
import { useStudents } from "../hooks/useStudents";
import StudentTable from "./StudentTable";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import ErrorServer from "@/components/error-handling/ErrorServer";
import autoTable from "jspdf-autotable";

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
    doc.text("Laporan Data Seleksi Siswa", 105, 10, { align: "center" });

    // Data untuk tabel
    const tableData = students.map((student: any, index: number) => [
      index + 1,
      student.name,
      student.nisn,
      student.ijazahNumber,
      student.major,
      student.phone,
      student.selectionResult === "PASSED"
        ? "Lulus"
        : student.selectionResult === "FAILED"
        ? "Tidak Lulus"
        : "Belum Ditentukan",
    ]);

    // Header kolom tabel
    const tableHeaders = [
      "No",
      "Nama",
      "NISN",
      "Nomor Ijazah",
      "Jurusan",
      "No Telepon",
      "Status Seleksi",
    ];

    // Generate tabel dengan autoTable
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 10 }, // No
        1: { cellWidth: 40 }, // Nama
        2: { cellWidth: 25 }, // NISN
        3: { cellWidth: 30 }, // Nomor Ijazah
        4: { cellWidth: 30 }, // Jurusan
        5: { cellWidth: 30 }, // No Telepon
        6: { cellWidth: 25 }, // Status Seleksi
      },
    });

    doc.save("laporan_data_seleksi_siswa.pdf");
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Seleksi Siswa");
    XLSX.writeFile(workbook, "laporan_data_seleksi_siswa.xlsx");
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

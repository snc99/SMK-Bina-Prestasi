import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan lokasi prisma instance

export async function GET() {
  try {
    // Mengambil semua data siswa
    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        nisn: true,
        ijazahNumber: true,
        major: true,
        phone: true,
        selectionResult: true, // Hasil seleksi
      },
      orderBy: { name: "asc" },
    });

    // Memisahkan data berdasarkan selectionResult
    const passedStudents = students.filter(
      (student) => student.selectionResult === "PASSED"
    );
    const failedStudents = students.filter(
      (student) => student.selectionResult === "FAILED"
    );
    const pendingStudents = students.filter(
      (student) => student.selectionResult === "PENDING"
    );

    // Mengembalikan hasil sebagai response JSON
    return NextResponse.json(
      {
        passedStudents,
        failedStudents,
        pendingStudents,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

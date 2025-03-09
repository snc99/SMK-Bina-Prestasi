import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan lokasi prisma instance

export async function GET() {
  try {
    // Mengambil semua data siswa yang sudah terdaftar
    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        nisn: true,
        ijazahNumber: true,
        schoolOrigin: true,
        major: true,
        phone: true,
        status: true, // Status pendaftaran (PENDING, VERIFIED, REJECTED)
        createdAt: true,
      },
      orderBy: { createdAt: "asc" }, // Urutkan berdasarkan waktu pendaftaran
    });

    // Mengembalikan data dalam format JSON
    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data pendaftaran." },
      { status: 500 }
    );
  }
}

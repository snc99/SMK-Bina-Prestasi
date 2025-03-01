import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      where: { status: "PENDING" },
      select: {
        id: true,
        name: true,
        nisn: true,
        ijazahNumber: true,
        schoolOrigin: true, // Tambahkan asal sekolah
        major: true, // Tambahkan jurusan
        phone: true, // Tambahkan nomor telepon
        status: true,
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

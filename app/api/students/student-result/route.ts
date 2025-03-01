import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan lokasi prisma instance

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        nisn: true,
        major: true,
        phone: true,
        selectionResult: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

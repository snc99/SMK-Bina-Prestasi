import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.$queryRaw`
      SELECT id, name, nisn, major, phone, "selectionResult"
      FROM "Student"
      ORDER BY 
        CASE 
          WHEN "selectionResult" = 'PENDING' THEN 1
          WHEN "selectionResult" = 'FAILED' THEN 2
          WHEN "selectionResult" = 'PASSED' THEN 3
        END, name ASC
    `;

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

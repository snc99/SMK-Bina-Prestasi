import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.$queryRaw`
      SELECT * FROM "Student"
      ORDER BY 
        CASE 
          WHEN status = 'PENDING' THEN 1
          WHEN status = 'REJECTED' THEN 2
          WHEN status = 'VERIFIED' THEN 3
          ELSE 4
        END,
        "createdAt" DESC
    `;

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

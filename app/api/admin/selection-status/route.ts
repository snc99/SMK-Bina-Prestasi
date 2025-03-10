import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      where: { selectionResult: "PENDING" },
      select: {
        id: true,
        name: true,
        nisn: true,
        major: true,
        selectionResult: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

// POST: Update status seleksi siswa
export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    // Validasi nilai status
    const validStatuses = ["PASSED", "FAILED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Status tidak valid!" },
        { status: 400 }
      );
    }

    // Update status seleksi di database
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { selectionResult: status },
    });

    return NextResponse.json({
      message: "Status seleksi berhasil diperbarui!",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("🔥 Error saat update status seleksi:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui status seleksi." },
      { status: 500 }
    );
  }
}

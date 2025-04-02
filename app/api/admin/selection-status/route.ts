import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("search") || "";
    let page = parseInt(url.searchParams.get("page") || "1", 10);
    let limit = parseInt(url.searchParams.get("limit") || "10", 10);

    // Pastikan nilai page dan limit valid
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    // Hitung total data
    const totalStudents = await prisma.student.count({
      where: {
        selectionResult: "PENDING",
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { nisn: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
    });

    // Ambil data dengan paginasi
    const students = await prisma.student.findMany({
      where: {
        selectionResult: "PENDING",
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { nisn: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        nisn: true,
        major: true,
        selectionResult: true,
      },
      orderBy: { createdAt: "asc" },
      skip,
      take: limit,
    });

    return NextResponse.json(
      {
        students,
        totalStudents,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
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

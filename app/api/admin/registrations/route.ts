import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Student = {
  id: string;
  name: string;
  nisn: string;
  ijazahNumber: string;
  schoolOrigin: string;
  major: string;
  phone: string;
  status: string;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default 10 data per halaman

    const skip = (page - 1) * limit;

    // Hitung total data yang tersedia
    const totalStudents = await prisma.student.count({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { nisn: { contains: search, mode: "insensitive" } },
              { ijazahNumber: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    });

    const students: Student[] = await prisma.student.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { nisn: { contains: search, mode: "insensitive" } },
              { ijazahNumber: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      select: {
        id: true,
        name: true,
        nisn: true,
        ijazahNumber: true,
        schoolOrigin: true,
        major: true,
        phone: true,
        status: true,
      },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
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
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data", details: error },
      { status: 500 }
    );
  }
}

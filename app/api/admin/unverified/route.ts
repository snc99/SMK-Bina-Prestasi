import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Ambil parameter dari query string
    const {
      search,
      page = "1",
      limit = "10",
    } = Object.fromEntries(new URL(req.url).searchParams);

    const pageNumber = parseInt(page, 10); // Konversi ke number
    const limitNumber = parseInt(limit, 10); // Konversi ke number
    const skip = (pageNumber - 1) * limitNumber; // Hitung offset

    // Query data siswa yang belum diverifikasi (status: PENDING)
    const students = await prisma.student.findMany({
      where: {
        status: "PENDING",
        OR: search
          ? [
              { name: { contains: search, mode: "insensitive" } },
              { nisn: { contains: search, mode: "insensitive" } },
              { ijazahNumber: { contains: search, mode: "insensitive" } },
            ]
          : undefined,
      },
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
      skip, // Lewati data sebanyak `skip`
      take: limitNumber, // Ambil data sebanyak `limit`
    });

    // Hitung total siswa yang belum diverifikasi (dengan filter search jika ada)
    const totalStudents = await prisma.student.count({
      where: {
        status: "PENDING",
        OR: search
          ? [
              { name: { contains: search, mode: "insensitive" } },
              { nisn: { contains: search, mode: "insensitive" } },
              { ijazahNumber: { contains: search, mode: "insensitive" } },
            ]
          : undefined,
      },
    });

    // Hitung total halaman
    const totalPages = Math.ceil(totalStudents / limitNumber);

    return NextResponse.json(
      {
        students,
        totalStudents,
        totalPages,
        currentPage: pageNumber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data siswa yang belum diverifikasi." },
      { status: 500 }
    );
  }
}

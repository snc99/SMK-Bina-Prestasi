import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search) {
      return NextResponse.json({ students: [] }, { status: 200 });
    }

    const students = await prisma.student.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { nisn: { contains: search, mode: "insensitive" } },
          { ijazahNumber: { contains: search, mode: "insensitive" } },
        ],
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
        selectionResult: true,
      },
    });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mencari data siswa." },
      { status: 500 }
    );
  }
}

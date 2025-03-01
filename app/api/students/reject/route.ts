import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json(); // Ambil ID dari body request

    await prisma.student.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    return NextResponse.json({ message: "Pendaftar ditolak" }, { status: 200 });
  } catch (error) {
    console.error("Error saat menolak pendaftar:", error);
    return NextResponse.json(
      { message: "Gagal menolak pendaftar" },
      { status: 500 }
    );
  }
}

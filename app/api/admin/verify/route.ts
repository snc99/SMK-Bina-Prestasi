import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const student = await prisma.student.update({
      where: { id },
      data: { status: "VERIFIED" },
    });

    return NextResponse.json(
      { message: "Pendaftar berhasil diverifikasi" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memverifikasi" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    console.log("ID yang diterima:", id); // Debugging

    // Update status jadi VERIFIED
    const student = await prisma.student.update({
      where: { id },
      data: { status: "VERIFIED" },
    });

    console.log("Student setelah update:", student); // Debugging

    return NextResponse.json(
      { message: "Pendaftar berhasil diverifikasi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat verifikasi:", error); // Debugging
    return NextResponse.json(
      { message: "Gagal memverifikasi" },
      { status: 500 }
    );
  }
}

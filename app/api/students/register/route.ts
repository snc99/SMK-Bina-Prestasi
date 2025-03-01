import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { studentSchema } from "@/lib/validations/studentValidation";
import { Status, StatusSelection } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🛠️ Validasi input dengan Zod
    const parsedData = studentSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { name, nisn, ijazahNumber, schoolOrigin, major, phone, password } =
      parsedData.data;

    // 🔍 Cek apakah NISN atau Nomor Ijazah sudah digunakan
    const existingStudent = await prisma.student.findFirst({
      where: { OR: [{ nisn }, { ijazahNumber }] },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: "NISN atau Nomor Ijazah sudah terdaftar" },
        { status: 400 }
      );
    }

    // 🔐 Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Simpan data siswa
    const newStudent = await prisma.student.create({
      data: {
        name,
        nisn,
        ijazahNumber,
        schoolOrigin,
        major,
        phone,
        password: hashedPassword,
        status: Status.PENDING, // Gunakan enum dari Prisma
        selectionResult: StatusSelection.PENDING, // Gunakan enum dari Prisma
      },
    });

    return NextResponse.json(
      { message: "Pendaftaran berhasil", student: newStudent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error registering student:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "NISN atau Nomor Ijazah sudah terdaftar" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Gagal mendaftar" }, { status: 500 });
  }
}

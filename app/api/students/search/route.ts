import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (!query) return NextResponse.json([]);

  const students = await prisma.student.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nisn: { contains: query } },
        { ijazahNumber: { contains: query } },
      ],
    },
  });

  return NextResponse.json(students);
}

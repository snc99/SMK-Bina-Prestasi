import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    let page = parseInt(searchParams.get("page") || "1", 10);
    let limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    // Query total data dengan tipe data yang benar
    const totalStudents = await prisma.$queryRaw<
      { total: number }[]
    >(Prisma.sql`
      SELECT COUNT(*)::INTEGER AS total FROM "Student"
      WHERE 
        ${
          search
            ? Prisma.sql`(name ILIKE ${"%" + search + "%"} OR nisn ILIKE ${
                "%" + search + "%"
              })`
            : Prisma.sql`TRUE`
        }
    `);
    const total = totalStudents[0]?.total || 0;

    // Query data siswa dengan pagination
    const students = await prisma.$queryRaw(Prisma.sql`
      SELECT id, name, nisn, major, phone, "selectionResult"
      FROM "Student"
      WHERE 
        ${
          search
            ? Prisma.sql`(name ILIKE ${"%" + search + "%"} OR nisn ILIKE ${
                "%" + search + "%"
              })`
            : Prisma.sql`TRUE`
        }
      ORDER BY 
        CASE 
          WHEN "selectionResult" = 'PENDING' THEN 1
          WHEN "selectionResult" = 'FAILED' THEN 2
          WHEN "selectionResult" = 'PASSED' THEN 3
        END, name ASC
      LIMIT ${limit} OFFSET ${offset}
    `);

    return NextResponse.json(
      {
        students,
        totalStudents: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data siswa." },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

// export async function GET(req: Request) {
//   try {
//     const { search } = Object.fromEntries(new URL(req.url).searchParams);

//     const students = await prisma.$queryRaw(Prisma.sql`
//       SELECT id, name, nisn, major, phone, "selectionResult"
//       FROM "Student"
//       WHERE
//         ${
//           search
//             ? Prisma.sql`(
//           name ILIKE ${"%" + search + "%"}
//           OR nisn ILIKE ${"%" + search + "%"}
//         )`
//             : Prisma.sql`TRUE`
//         }
//       ORDER BY
//         CASE
//           WHEN "selectionResult" = 'PENDING' THEN 1
//           WHEN "selectionResult" = 'FAILED' THEN 2
//           WHEN "selectionResult" = 'PASSED' THEN 3
//         END, name ASC
//     `);

//     return NextResponse.json({ students }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Terjadi kesalahan saat mengambil data siswa." },
//       { status: 500 }
//     );
//   }
// }

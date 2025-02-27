import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash password untuk admin
  const hashedAdminPassword = await bcrypt.hash("admin2323", 10);

  // Insert admin ke database
  const admin = await prisma.admin.upsert({
    where: { email: "admin@binaprestasi.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@binaprestasi.com",
      password: hashedAdminPassword,
    },
  });

  console.log("Admin berhasil dibuat:", admin);

  // Hash password untuk siswa
  const hashedStudentPassword = await bcrypt.hash("siswa123", 10);

  // Insert siswa ke database
  const student = await prisma.student.upsert({
    where: { nisn: "1234567890" },
    update: {},
    create: {
      name: "Budi Santoso",
      nisn: "1234567890",
      password: hashedStudentPassword,
      status: "VERIFIED",
      ijazahNumber: "IJZ123456789",
      schoolOrigin: "SMP Negeri 1 Jakarta",
      major: "Teknik Informatika",
      phone: "081234567890",
    },
  });

  console.log("Siswa berhasil dibuat:", student);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

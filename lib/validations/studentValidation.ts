import { z } from "zod";

// 🛠️ Skema validasi untuk pendaftaran siswa
export const studentSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  nisn: z
    .string()
    .length(10, "NISN harus 10 digit angka")
    .regex(/^\d+$/, "NISN hanya boleh angka"),
  ijazahNumber: z.string().min(5, "Nomor ijazah minimal 5 karakter"),
  schoolOrigin: z.string().min(3, "Asal sekolah minimal 3 karakter"),
  major: z.string().min(3, "Jurusan minimal 3 karakter"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(13, "Nomor telepon maksimal 13 digit")
    .regex(/^\d+$/, "Nomor telepon hanya boleh angka"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

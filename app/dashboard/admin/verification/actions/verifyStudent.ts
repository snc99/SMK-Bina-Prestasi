import useSWR from "swr";
import { Student } from "@prisma/client"; // Pastikan `Student` diimport dari Prisma

export function useVerifyStudent() {
  const { mutate } = useSWR<Student[]>("/api/students/unverified"); // Menentukan tipe data

  const verifyStudent = async (id: string) => {
    try {
      // Optimistic Update: Update UI sebelum request selesai
      await mutate(
        async (currentData: Student[] | undefined) => {
          const res = await fetch("/api/students/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });

          if (!res.ok) throw new Error("Gagal memverifikasi siswa");

          // Hapus siswa yang sudah diverifikasi dari daftar "unverified"
          return currentData?.filter((student) => student.id !== id) || [];
        },
        { revalidate: true }
      );
    } catch (error) {
      console.error("Verifikasi gagal:", error);
    }
  };

  return { verifyStudent };
}

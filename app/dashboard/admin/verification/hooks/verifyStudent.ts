import useSWR from "swr";
import { Student } from "@prisma/client";

export function useVerifyStudent() {
  const { mutate } = useSWR<Student[]>("/api/admin/unverified");

  const verifyStudent = async (id: string) => {
    try {
      await mutate(
        async (currentData: Student[] | undefined) => {
          const res = await fetch("/api/admin/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });

          if (!res.ok) throw new Error("Gagal memverifikasi siswa");

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

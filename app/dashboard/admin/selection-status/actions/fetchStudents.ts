"use server";

export async function updateSelectionStatus(
  id: string,
  status: "LULUS" | "TIDAK LULUS"
) {
  try {
    const statusMap = {
      LULUS: "PASSED",
      "TIDAK LULUS": "FAILED",
    } as const;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/selection-status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: statusMap[status] }),
      }
    );

    if (!res.ok) {
      throw new Error("Gagal memperbarui status seleksi.");
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating selection status:", error);
    return { error: "Terjadi kesalahan saat memperbarui status seleksi." };
  }
}

export async function getStudents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/selection-status`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Gagal mengambil data pendaftar.");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching students:", error);
    return { students: [] };
  }
}

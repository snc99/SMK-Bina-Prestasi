"use server";

const REVERSE_STATUS_MAP = {
  LULUS: "PASSED",
  "TIDAK LULUS": "FAILED",
} as const;

export async function updateSelectionStatus(
  id: string,
  status: keyof typeof REVERSE_STATUS_MAP
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/selection-status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: REVERSE_STATUS_MAP[status] }),
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

export async function getStudents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/export`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data pendaftar."); // ✅ Lempar error ke SWR
  }

  return await res.json();
}

export async function getStudents() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/export-registration`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data pendaftar.");
  }

  const data = await res.json();
  return data;
}

export async function getStudents() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/export-registration`;
  console.log("Fetching data from:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Gagal mengambil data:", res.status);
    throw new Error("Gagal mengambil data pendaftar.");
  }

  const data = await res.json();
  console.log("API Response:", data); // Debugging
  return data;
}

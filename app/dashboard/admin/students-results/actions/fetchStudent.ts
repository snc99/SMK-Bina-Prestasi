export async function getStudents(url: string) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil data pendaftar.");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}

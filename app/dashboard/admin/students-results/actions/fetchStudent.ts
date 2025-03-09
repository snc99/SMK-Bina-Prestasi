export async function getStudents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/students-result`,
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

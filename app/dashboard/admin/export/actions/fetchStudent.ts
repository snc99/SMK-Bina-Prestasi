export async function getStudents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/export`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Gagal mengambil data pendaftar.");
    }

    return await res.json(); // Assuming the response structure is correct (passedStudents, failedStudents, pendingStudents)
  } catch (error) {
    console.error("Error fetching students:", error);
    return { passedStudents: [], failedStudents: [], pendingStudents: [] }; // Return empty arrays for each category
  }
}

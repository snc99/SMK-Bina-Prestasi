export async function fetchStudents(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }
    const data = await response.json();

    console.log("Fetched API Response:", data); // Debug API Response

    // Pastikan seluruh data dikembalikan
    return {
      students: data.students || [],
      totalStudents: data.totalStudents || 0,
      totalPages: data.totalPages || 1,
      currentPage: data.currentPage || 1,
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { students: [], totalStudents: 0, totalPages: 1, currentPage: 1 };
  }
}

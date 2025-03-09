export async function fetchStudents() {
  try {
    const response = await fetch("/api/admin/list"); 
    if (!response.ok) {
      throw new Error("Gagal mengambil data siswa");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Gagal mengambil data"
    );
  }
}

export const fetchStudents = async () => {
  try {
    const response = await fetch("/api/admin/list");

    if (!response.ok) {
      throw new Error("Gagal mengambil data siswa");
    }

    const data = await response.json();

    return data; 
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    return [];
  }
};

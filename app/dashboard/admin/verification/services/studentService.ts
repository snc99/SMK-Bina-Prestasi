export async function fetchUnverifiedStudents() {
  const res = await fetch("/api/admin/unverified");
  if (!res.ok) throw new Error("Gagal mengambil data siswa.");
  return res.json();
}

export async function verifyStudent(id: string) {
  const res = await fetch(`/api/admin/verify/${id}`, { method: "POST" });
  const data = await res.json();
  return data;
}

export async function rejectStudent(id: string) {
  const res = await fetch(`/api/admin/reject/${id}`, { method: "POST" });
  const data = await res.json();
  return data;
}

export async function verifyStudent(id: string) {
  try {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: "Gagal memverifikasi siswa." };
  }
}

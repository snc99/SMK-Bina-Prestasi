"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useStudents } from "@/app/dashboard/admin/registrations/hooks/useStudents";

// Skema validasi dengan Zod
const studentSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  nisn: z.string().length(10, "NISN harus 10 digit"),
  ijazahNumber: z.string().min(5, "Nomor ijazah minimal 5 karakter"),
  schoolOrigin: z.string().min(3, "Asal sekolah minimal 3 karakter"),
  major: z.string().min(2, "Jurusan minimal 2 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

// Tipe data dari form
type StudentFormData = z.infer<typeof studentSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Untuk mereset form setelah submit
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const { mutate } = useStudents(); // 🔥 Gunakan mutate untuk update data di halaman admin

  // Fungsi submit form
  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, status: "PENDING" }),
      });

      if (!response.ok) throw new Error("Gagal mendaftar");

      const responseData = await response.json(); // ✅ Ambil respons API
      console.log("✅ Pendaftaran berhasil:", responseData); // ✅ Log respons API

      alert("Pendaftaran berhasil!");
      reset(); // Reset form setelah berhasil
      mutate(); // 🔥 Update data di halaman admin tanpa refresh
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-300 p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Pendaftaran Siswa Baru
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            "name",
            "nisn",
            "ijazahNumber",
            "schoolOrigin",
            "major",
            "phone",
            "password",
          ].map((field) => (
            <div key={field}>
              <Input
                type={field === "password" ? "password" : "text"}
                {...register(field as keyof StudentFormData)}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-md p-3 w-full"
              />
              {errors[field as keyof StudentFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof StudentFormData]?.message}
                </p>
              )}
            </div>
          ))}
          <div className="col-span-1 md:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Daftar"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

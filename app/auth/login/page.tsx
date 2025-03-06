"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [loading, setLoading] = useState(false);

  // State untuk login Admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk login Student
  const [nisn, setNisn] = useState("");

  // 🔹 Jika sudah login, redirect ke dashboard tanpa merender halaman login
  useEffect(() => {
    if (status === "authenticated") {
      console.log("✅ User is authenticated. Session:", session);
      const redirectUrl =
        session.user.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/students";
      console.log("🔀 Redirecting to:", redirectUrl);
      router.replace(redirectUrl);
    }
  }, [session, status, router]);

  // 🔹 Tampilkan loading spinner jika session sedang dicek
  if (
    status === "loading" ||
    (status === "authenticated" && session?.user?.role)
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const credentials =
      role === "admin" ? { email, password } : { nisn, password };

    console.log("🔍 Sending credentials:", credentials); // 🔍 Debugging

    try {
      const res = await signIn(role === "admin" ? "credentials" : "student", {
        ...credentials,
        redirect: false, // Jangan redirect otomatis dari NextAuth
      });

      console.log("🔑 Response from signIn:", res); // 🔍 Debugging

      if (res?.error) {
        console.error("⛔ Login error:", res.error);
        setError("Login gagal. Periksa kembali data yang dimasukkan!");
      } else {
        console.log("✅ Login successful. Redirecting...");
        router.replace(
          role === "admin" ? "/dashboard/admin" : "/dashboard/students"
        );
      }
    } catch (error) {
      console.error("⛔ Unexpected error during login:", error);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          Login {role === "admin" ? "Admin" : "Siswa"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={role === "admin" ? "default" : "outline"}
            onClick={() => setRole("admin")}
            disabled={loading}
          >
            Admin
          </Button>
          <Button
            type="button"
            variant={role === "student" ? "default" : "outline"}
            onClick={() => setRole("student")}
            disabled={loading}
          >
            Siswa
          </Button>
        </div>

        {role === "admin" ? (
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        ) : (
          <Input
            type="text"
            placeholder="NISN"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            required
            disabled={loading}
          />
        )}

        {/* Input Password */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-2"
          disabled={loading}
        />

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading...
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [loading, setLoading] = useState(false);

  // State untuk login Admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk login Student
  const [nisn, setNisn] = useState("");

  // Jika sudah login, redirect ke dashboard sesuai role
  useEffect(() => {
    if (session?.user?.role) {
      router.replace(
        session.user.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/students"
      );
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const credentials =
      role === "admin" ? { email, password } : { nisn, password };

    console.log("Sending credentials:", credentials); // 🔍 Debugging

    const res = await signIn(role === "admin" ? "credentials" : "student", {
      ...credentials,
      redirect: false,
    });

    console.log("Response from signIn:", res); // 🔍 Debugging

    if (res?.error) {
      setError("Login gagal. Periksa kembali data yang dimasukkan!");
      setLoading(false);
    } else {
      setTimeout(() => {
        router.push(
          role === "admin" ? "/dashboard/admin" : "/dashboard/students"
        );
      }, 500);
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
          <>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </>
        ) : (
          <>
            <Input
              type="text"
              placeholder="NISN"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              required
              disabled={loading}
            />
          </>
        )}

        {/* Input Password (Digunakan oleh Admin & Siswa) */}
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

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "student";
      nisn?: string; // ✅ Pastikan nisn bisa digunakan pada student
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "admin" | "student";
    nisn?: string; // ✅ Tambahkan nisn ke User jika role adalah student
  }
}

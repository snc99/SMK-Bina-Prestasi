import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan Password harus diisi!");
        }

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("Akun tidak ditemukan!");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (!isValid) throw new Error("Password salah!");

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        };
      },
    }),
    CredentialsProvider({
      id: "student",
      name: "Student Login",
      credentials: {
        nisn: { label: "NISN", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.nisn || !credentials.password) {
          throw new Error("NISN dan Password harus diisi!");
        }

        const student = await prisma.student.findUnique({
          where: { nisn: credentials.nisn },
        });

        if (!student) {
          throw new Error("Akun tidak ditemukan!");
        }

        if (student.status !== "VERIFIED") {
          throw new Error("Akun belum diverifikasi oleh admin!");
        }

        if (!student.password) {
          throw new Error("Akun ini tidak memiliki password!");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          student.password
        );
        if (!isValid) {
          throw new Error("Password salah!");
        }

        return {
          id: student.id,
          name: student.name,
          nisn: student.nisn,
          role: "student",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        if (user.role === "student") {
          token.nisn = user.nisn;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "student";
        if (token.role === "student") {
          session.user.nisn = token.nisn as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

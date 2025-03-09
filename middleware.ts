import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname, searchParams } = req.nextUrl;

    const isLoginPage = pathname === "/auth/login";
    const isAdminPage = pathname.startsWith("/dashboard/admin");
    const isStudentPage = pathname.startsWith("/dashboard/students");

    const callbackUrl = searchParams.get("callbackUrl");
    const isLooping = callbackUrl?.includes("/auth/login");

    // 🔹 Cegah infinite loop dengan menghapus callbackUrl yang bermasalah
    if (isLoginPage && isLooping) {
      const newUrl = new URL("/auth/login", req.url);
      newUrl.searchParams.delete("callbackUrl"); // Hapus callbackUrl
      return NextResponse.redirect(newUrl);
    }

    // 🔹 Jika sudah login dan mengakses halaman login, redirect ke dashboard yang sesuai
    if (isLoginPage && token) {
      const redirectUrl =
        token.role === "admin" ? "/dashboard/admin" : "/dashboard/students";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // 🔹 Jika belum login dan mencoba mengakses halaman yang dilindungi, redirect ke login
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 🔹 Pastikan hanya admin yang bisa mengakses halaman admin
    if (isAdminPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/students", req.url));
    }

    // 🔹 Pastikan hanya siswa yang bisa mengakses halaman siswa
    if (isStudentPage && token?.role !== "student") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login", // Halaman login
    },
  }
);

export const config = {
  matcher: ["/auth/login", "/dashboard/:path*"], // Jalur yang dilindungi
};

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

    console.log("📌 Current Path:", pathname);
    console.log("🔄 Callback URL:", callbackUrl);
    console.log("🔄 Is Looping?", isLooping);

    // 🔹 Cegah infinite loop dengan menghapus callbackUrl yang bermasalah
    if (isLoginPage && isLooping) {
      console.log("🛑 Loop detected, removing callback URL");
      const newUrl = new URL("/auth/login", req.url);
      newUrl.searchParams.delete("callbackUrl"); // Hapus callbackUrl
      return NextResponse.redirect(newUrl);
    }

    // 🔹 Jika sudah login dan mengakses halaman login, redirect ke dashboard yang sesuai
    if (isLoginPage && token) {
      const redirectUrl =
        token.role === "admin" ? "/dashboard/admin" : "/dashboard/students";
      console.log("✅ User logged in, redirecting to:", redirectUrl);
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // 🔹 Jika belum login dan mencoba mengakses halaman yang dilindungi, redirect ke login
    if (!token && !isLoginPage) {
      console.log("⛔ User not logged in, redirecting to /auth/login");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 🔹 Pastikan hanya admin yang bisa mengakses halaman admin
    if (isAdminPage && token?.role !== "admin") {
      console.log("⛔ Access denied! Student tried accessing admin page.");
      return NextResponse.redirect(new URL("/dashboard/students", req.url));
    }

    // 🔹 Pastikan hanya siswa yang bisa mengakses halaman siswa
    if (isStudentPage && token?.role !== "student") {
      console.log("⛔ Access denied! Admin tried accessing student page.");
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    console.log("✅ Access granted:", pathname);
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

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isLoginPage = req.nextUrl.pathname.startsWith("/auth/login");
    const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard/admin");
    const isStudentPage = req.nextUrl.pathname.startsWith(
      "/dashboard/students"
    );

    // **1. Cegah akses login jika sudah login**
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // **2. Jika tidak ada token, paksa login**
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // **3. Cek akses admin/student ke halaman yang benar**
    if (isAdminPage && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/students", req.url));
    }

    if (isStudentPage && token.role !== "student") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    // **4. Jika semua sudah sesuai, lanjutkan request**
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/auth/login", "/dashboard/:path*"],
};

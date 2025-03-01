import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard/admin");
    const isStudentPage = req.nextUrl.pathname.startsWith(
      "/dashboard/students"
    );

    if (isAdminPage && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/students", req.url));
    }

    if (isStudentPage && token.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

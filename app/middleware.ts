import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const userStr = request.cookies.get("user");
  const { pathname } = request.nextUrl;

  // 1. Proteksi route /admin
  if (pathname.startsWith("/admin")) {
    if (!token || !userStr) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = JSON.parse(decodeURIComponent(userStr.value));
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/users/dashboard", request.url));
    }
  }

  // 2. Proteksi route /users
  if (pathname.startsWith("/users")) {
    if (!token || !userStr) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = JSON.parse(decodeURIComponent(userStr.value));
    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // 3. Kalau udah login jangan bisa akses /login
  if (pathname === "/login" && token) {
    const user = JSON.parse(decodeURIComponent(userStr!.value));
    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/users/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login"],
};

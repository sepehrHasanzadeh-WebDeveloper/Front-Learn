import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function proxy(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/auth";
  const isProfile = pathname.startsWith("/profile");
  const isAdmin = pathname.startsWith("/admin");

  if (isAuthPage) {
    if (!accessToken) return NextResponse.next();

    try {
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const redirectTo =
        payload.role === "admin" ? "/admin/dashboard" : "/profile";

      return NextResponse.redirect(new URL(redirectTo, request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (isProfile || isAdmin) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    try {
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      if (isAdmin && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

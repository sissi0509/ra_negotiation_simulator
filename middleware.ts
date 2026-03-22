import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((_req) => {
  const { pathname } = _req.nextUrl;
  const isAuthenticated = !!_req.auth;
  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", _req.url));
  }
  if (!isAuthenticated) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", _req.url));
  }
});

export const config = {
  // Excludes: / (public landing), /login, /api/auth/*, Next.js internals, favicon
  matcher: ["/((?!$|login|api/auth|_next/static|_next/image|favicon.ico).*)"],
};

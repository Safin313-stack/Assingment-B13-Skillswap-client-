import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("skillswap_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // If logged in, don't go to auth page
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};

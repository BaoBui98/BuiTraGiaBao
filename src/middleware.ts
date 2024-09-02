import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./constant/auth-name";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN);
  const { pathname } = req.nextUrl;
  const loginPath = "/login";
  const registerPath = "/register";

  if (accessToken && (pathname === loginPath || pathname === registerPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!accessToken && pathname !== loginPath && pathname !== registerPath) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

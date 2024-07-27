import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("tk_token")?.value;

  if (!token) {
    const pathAllow = ["/public/order", "/login"];
    if (pathAllow.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/public/order", request.url));
  }

  if (["/login", "/"].includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|.next/static|.next/image|assets|favicon.ico|sw.js|affiliate.svg).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  if (request.nextUrl.locale === "default") {
    const locale = "en";
    return NextResponse.redirect(
      new URL(
        `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  const token = request.cookies.get("tk_token")?.value;

  if (!token) {
    const pathAllow = ["/customer/order", "/login"];
    if (pathAllow.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/customer/order", request.url));
  }

  if (["/login", "/"].includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!proxy|!api|.next/static|.next/image|assets|favicon.ico|sw.js|affiliate.svg).*)",
  ],
};

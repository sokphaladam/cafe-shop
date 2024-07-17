import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('tk_token')?.value;

  if(!token) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|.next/static|.next/image|assets|favicon.ico|sw.js|affiliate.svg).*)"],
}
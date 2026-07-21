import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") return NextResponse.next();
  return NextResponse.redirect(new URL("/en", request.url), 308);
}

export const config = { matcher: ["/"] };

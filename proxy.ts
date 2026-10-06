import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_ACCESS_COOKIE, privateAccessToken } from "@/lib/private-access";

export function proxy(request: NextRequest) {
  const expectedToken = privateAccessToken();
  const suppliedToken = request.cookies.get(PRIVATE_ACCESS_COOKIE)?.value;

  if (expectedToken && suppliedToken === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/notes", "/journal"],
};

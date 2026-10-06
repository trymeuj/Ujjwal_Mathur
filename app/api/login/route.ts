import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { PRIVATE_ACCESS_COOKIE, privateAccessToken } from "@/lib/private-access";

function matches(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export async function POST(request: NextRequest) {
  const configuredPassword = process.env.SITE_PASSWORD ?? "";
  const accessToken = privateAccessToken();

  if (!configuredPassword || !accessToken) {
    return NextResponse.json({ error: "Private access is not configured." }, { status: 503 });
  }

  const { password } = (await request.json()) as { password?: string };
  if (!password || !matches(password, configuredPassword)) {
    return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(PRIVATE_ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

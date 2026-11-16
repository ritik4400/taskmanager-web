import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/config/constants";

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

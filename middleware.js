import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl;

  console.log("-----JWT TOKEN-----", token);

  if (pathname.includes("/dashboards") || token) {
    if (token?.userRole == "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${origin}/auth/login`);
    }
  }

  if (pathname.includes("/api/backend") || token) {
    if (token?.userRole == "admin") {
      return NextResponse.next();
    } else {
      console.log("-----API NOT AUTHORIZED-----", token);
      return NextResponse.redirect(`${origin}/api/auth/notauthorized`);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboards/:path*", "/api/:path*"] };

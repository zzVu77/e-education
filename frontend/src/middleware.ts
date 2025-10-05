import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    console.log("Access token is expired or invalid");
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;
  const isPublicRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (!accessToken && !refreshToken) {
    if (isPublicRoute) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("returnTo", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  // If access token is present
  if (accessToken) {
    // Verify the access token
    const validPayload = await verifyToken(accessToken);
    // If the token is valid and the user is trying to access a public route, redirect to home
    if (validPayload && isPublicRoute) {
      const returnTo = req.nextUrl.searchParams.get("returnTo");
      if (returnTo) {
        return NextResponse.redirect(new URL(returnTo, req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
    // If the token is invalid and there's a refresh token, attempt to refresh
    // if (!validPayload && refreshToken) {
    //   // Redirect to the refresh API endpoint of Nextjs with returnTo parameter
    //   const refreshUrl = new URL("/api/auth/refresh", req.url);
    //   // Set returnTo to the current pathname
    //   refreshUrl.searchParams.set("returnTo", pathname);
    //   // Redirect to the refresh URL to get a new access token
    //   return NextResponse.redirect(refreshUrl);
    // }
    // If the token is valid, allow the request to proceed
    if (validPayload) {
      return NextResponse.next();
    }
  } else {
    // If no access token but there's a refresh token
    if (refreshToken) {
      const refreshUrl = new URL("/api/auth/refresh", req.url);
      refreshUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(refreshUrl);
    }
    // If no refresh token, redirect to login
    if (!refreshToken) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/test", "/login", "/signup"],
};

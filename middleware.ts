import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserType } from "@/types/auth.types";

const PROTECTED_ROUTES: Record<UserType, string> = {
  customer: "/dashboard/customer",
  driver: "/dashboard/driver",
  admin: "/dashboard/admin",
};

const AUTH_ROUTES = ["/login", "/register"];

// Correct routes matching the actual Next.js app structure
const DASHBOARD_ROUTES: Record<UserType, string> = {
  customer: "/dashboard/customer",
  driver: "/dashboard/driver",
  admin: "/dashboard/admin",
};

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string): boolean {
  return Object.values(PROTECTED_ROUTES).some((route) =>
    pathname.startsWith(route),
  );
}

function getRequiredRole(pathname: string): UserType | null {
  for (const [role, route] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) return role as UserType;
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // getToken reads and verifies the JWT from the session cookie
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const userType = token?.userType as UserType | undefined;

  // 1. Already logged in → redirect away from auth pages to their dashboard
  if (isLoggedIn && userType && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTES[userType], req.url));
  }

  // 2. Not logged in → redirect to login
  if (!isLoggedIn && isProtectedRoute(pathname)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Logged in but wrong role → redirect to own dashboard
  if (isLoggedIn && userType && isProtectedRoute(pathname)) {
    const requiredRole = getRequiredRole(pathname);
    if (requiredRole && userType !== requiredRole) {
      return NextResponse.redirect(
        new URL(DASHBOARD_ROUTES[userType], req.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)"],
};

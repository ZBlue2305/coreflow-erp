import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isDashboardRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    const role = (req.auth?.user as any)?.role?.toLowerCase() || "agent";

    // If navigating to base /dashboard, redirect to the specific role page
    if (nextUrl.pathname === "/dashboard") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, nextUrl));
    }

    const roles = ["manager", "hr", "sales", "it", "agent"];
    const pathSegments = nextUrl.pathname.split("/");
    const subRoute = pathSegments[2];

    if (subRoute && roles.includes(subRoute) && subRoute !== role) {
      // Redirect to their designated dashboard if unauthorized for this role view
      return NextResponse.redirect(new URL(`/dashboard/${role}`, nextUrl));
    }
  }

  if (isAuthRoute && isLoggedIn) {
    const role = (req.auth?.user as any)?.role?.toLowerCase() || "agent";
    return NextResponse.redirect(new URL(`/dashboard/${role}`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

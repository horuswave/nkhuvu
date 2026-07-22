// proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  let { pathname } = req.nextUrl;
  const user = req.auth?.user;

  // Skip API routes, static files, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // ========================
  // AUTH PROTECTION
  // ========================

  // Super Admin Routes
  if (pathname.startsWith("/super")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url),
      );
    }
    if (!user.isSuperAdmin) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.url),
      );
    }
    return NextResponse.next();
  }

  // Admin Routes
  if (pathname.startsWith("/admin")) {
    const adminPublicRoutes = ["/admin/login", "/admin/onboarding"];

    if (pathname === "/admin/login" && user) {
      const dest = user.isSuperAdmin
        ? "/super/dashboard"
        : user.eventId
          ? "/admin/dashboard"
          : "/admin/onboarding";
      return NextResponse.redirect(new URL(dest, req.url));
    }

    if (
      !adminPublicRoutes.includes(pathname) &&
      !user
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url),
      );
    }

    if (user?.isSuperAdmin && pathname.startsWith("/admin")) {
      return NextResponse.redirect(
        new URL("/super/dashboard", req.url),
      );
    }

    if (
      user &&
      !user.eventId &&
      !adminPublicRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(
        new URL("/admin/onboarding", req.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

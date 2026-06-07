// proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const supportedLocales = ["en", "pt", "ch"];
const defaultLocale = "en";

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
  // LOCALE DETECTION
  // ========================
  let currentLocale = defaultLocale;

  const pathnameHasLocale = supportedLocales.some((locale) => {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      currentLocale = locale;
      return true;
    }
    return false;
  });

  const pathnameWithoutLocale = pathnameHasLocale
    ? pathname.replace(/^\/(en|pt|ch)(\/|$)/, "/")
    : pathname;

  // ========================
  // LOCALE REDIRECTION
  // ========================
  if (!pathnameHasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // ========================
  // AUTH PROTECTION
  // ========================

  // Super Admin Routes
  if (pathnameWithoutLocale.startsWith("/super")) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/admin/login`, req.url),
      );
    }
    if (!user.isSuperAdmin) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/admin/dashboard`, req.url),
      );
    }
    return NextResponse.next();
  }

  // Admin Routes
  if (pathnameWithoutLocale.startsWith("/admin")) {
    if (pathnameWithoutLocale === "/admin/login" && user) {
      const dest = user.isSuperAdmin
        ? `/${currentLocale}/super/dashboard`
        : `/${currentLocale}/admin/dashboard`;
      return NextResponse.redirect(new URL(dest, req.url));
    }

    if (pathnameWithoutLocale !== "/admin/login" && !user) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/admin/login`, req.url),
      );
    }

    if (user?.isSuperAdmin && pathnameWithoutLocale.startsWith("/admin")) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/super/dashboard`, req.url),
      );
    }

    if (!user?.eventId && pathnameWithoutLocale !== "/admin/login") {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/admin/login`, req.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

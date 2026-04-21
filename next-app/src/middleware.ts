import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bogusPaths from "@/data/bogus-paths.json";
import { getCanonicalSlugIfLocationFirst } from "@/lib/pages-data";

const BOGUS = new Set(bogusPaths as string[]);

const CANONICAL_HOST = "www.ohmyglass.ca";

const DEDICATED_SLUG_TO_PATH = new Map<string, string>([
  ["index", "/"],
  ["contact", "/contact"],
  ["services", "/services"],
  ["resources", "/resources"],
  ["free-quote", "/free-quote"],
]);

export function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    const normalized =
      pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

    if (BOGUS.has(pathname) || BOGUS.has(normalized)) {
      return new NextResponse(null, { status: 404 });
    }

    const host = request.nextUrl.hostname.toLowerCase();
    const search = request.nextUrl.search;

    if (host === "ohmyglass.ca") {
      url.hostname = CANONICAL_HOST;
      return NextResponse.redirect(url, 301);
    }

    if (pathname.length > 1 && pathname.endsWith("/")) {
      const cleanPath = pathname.slice(0, -1);
      return NextResponse.redirect(new URL(cleanPath + search, request.url), 301);
    }

    if (pathname.endsWith(".html") && pathname.length > 5) {
      const inner = pathname.slice(1, -5);
      const dedicatedPath = DEDICATED_SLUG_TO_PATH.get(inner === "" ? "index" : inner);
      if (dedicatedPath != null) {
        return NextResponse.redirect(new URL(dedicatedPath + search, request.url), 301);
      }
      const stripped = pathname.slice(0, -5) || "/";
      return NextResponse.redirect(new URL(stripped + search, request.url), 301);
    }

    const pathForSlug = pathname;
    const slugFromPath = pathForSlug.startsWith("/") ? pathForSlug.slice(1) : pathForSlug;
    if (slugFromPath.length > 0) {
      const canonical = getCanonicalSlugIfLocationFirst(slugFromPath);
      if (canonical != null) {
        return NextResponse.redirect(new URL(`/${canonical}` + search, request.url), 301);
      }
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|xml|txt|css|js|DNG)$).*)",
  ],
};

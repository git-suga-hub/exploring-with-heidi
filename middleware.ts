import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "exploringwithheidi.com";
const REDIRECT_HOSTS = new Set(["www.exploringwithheidi.com", "exploring-with-heidi.vercel.app"]);

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const host = nextUrl.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1";

  if (!isLocal && (REDIRECT_HOSTS.has(host) || host !== CANONICAL_HOST)) {
    const url = new URL(nextUrl.pathname + nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  if (!isLocal && nextUrl.protocol !== "https:") {
    const url = new URL(nextUrl.pathname + nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

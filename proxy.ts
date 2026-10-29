import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, readSessionToken } from "@/lib/admin-session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  const isAdminPage = pathname.startsWith("/admin");
  const isProtectedApi = pathname.startsWith("/api/admin") && !isLoginApi;

  if (!isAdminPage && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  if (isLoginApi) return NextResponse.next();

  const session = await readSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  if (!session) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      const nextPath = `${pathname}${request.nextUrl.search}`;
      if (nextPath.startsWith("/admin")) loginUrl.searchParams.set("next", nextPath);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

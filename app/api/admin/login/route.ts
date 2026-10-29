import { NextResponse } from "next/server";
import { authenticateAdmin, getAdminCredentials } from "@/lib/admin-password";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createSessionToken,
  isAdminAuthConfigured,
} from "@/lib/admin-session";
import { clientIp, isCrossSitePost, rateLimit } from "@/lib/request-guards";

export const runtime = "nodejs";

function safeNextPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/admin") || value.startsWith("//")) {
    return "/admin";
  }
  return value;
}

export async function POST(request: Request) {
  if (isCrossSitePost(request)) {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 403 });
  }

  if (!rateLimit(`admin-login:${clientIp(request)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Please wait and try again." },
      { status: 429 },
    );
  }

  if (!isAdminAuthConfigured() || getAdminCredentials().length === 0) {
    return NextResponse.json(
      { error: "Administrator sign-in is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { username?: unknown; password?: unknown; next?: unknown };
    const username = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!username.trim() || password.length < 12 || password.length > 200) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const authenticatedUsername = await authenticateAdmin(username, password);
    if (!authenticatedUsername) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const { token, maxAge } = await createSessionToken(authenticatedUsername);
    const response = NextResponse.json({ ok: true, next: safeNextPath(body.next) });
    response.cookies.set(ADMIN_COOKIE, token, adminCookieOptions(maxAge));
    return response;
  } catch (error) {
    console.error("[api/admin/login] Sign-in failed.", error);
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}

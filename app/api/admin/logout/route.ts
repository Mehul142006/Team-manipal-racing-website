import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, readSessionToken } from "@/lib/admin-session";
import { isCrossSitePost } from "@/lib/request-guards";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isCrossSitePost(request)) {
    return NextResponse.json({ error: "Unable to log out." }, { status: 403 });
  }

  const cookieStore = await cookies();
  const session = await readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, "", { ...adminCookieOptions(0), maxAge: 0 });
  return response;
}

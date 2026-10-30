import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { updateContactSubmission } from "@/lib/admin-data";
import type { SubmissionAction } from "@/lib/admin-records";
import { ADMIN_COOKIE, readSessionToken } from "@/lib/admin-session";
import { isCrossSitePost } from "@/lib/request-guards";

export const runtime = "nodejs";

const ACTIONS = new Set<SubmissionAction>(["star", "unstar", "trash", "restore", "purge"]);

export async function POST(request: Request) {
  if (isCrossSitePost(request)) {
    return NextResponse.json({ error: "Unable to update this message." }, { status: 403 });
  }

  const cookieStore = await cookies();
  const session = await readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: unknown; action?: unknown };
  try {
    body = (await request.json()) as { id?: unknown; action?: unknown };
  } catch {
    return NextResponse.json({ error: "This message could not be updated." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const action = typeof body.action === "string" ? body.action : "";
  if (!ACTIONS.has(action as SubmissionAction)) {
    return NextResponse.json({ error: "This message could not be updated." }, { status: 400 });
  }

  try {
    const updated = await updateContactSubmission(id, action as SubmissionAction);
    if (!updated) {
      return NextResponse.json({ error: "This message could not be updated." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "This message could not be updated." }, { status: 500 });
  }
}

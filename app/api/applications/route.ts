import { NextResponse } from "next/server";
import {
  toApplicationInsert,
  validateApplicationForm,
  type ApplicationFormState,
} from "@/lib/recruitment";
import {
  getSupabaseServerConfig,
  insertApplicationRow,
  logSupabaseServerConfig,
} from "@/lib/supabase";

export async function GET() {
  const config = getSupabaseServerConfig();

  return NextResponse.json({
    configured: Boolean(config.url && config.key),
    urlSource: config.source.url,
    keySource: config.source.key,
  });
}

export async function POST(request: Request) {
  logSupabaseServerConfig("api/applications");

  try {
    const body = (await request.json()) as ApplicationFormState;
    const validationMessage = validateApplicationForm(body);

    if (validationMessage) {
      return NextResponse.json({ error: validationMessage }, { status: 400 });
    }

    const config = getSupabaseServerConfig();
    if (!config.key) {
      console.error("[api/applications] Missing Supabase anon key.", config.source);
      return NextResponse.json(
        {
          error:
            "Application service is not configured. Add SUPABASE_ANON_KEY in Vercel (Production) and redeploy.",
        },
        { status: 503 },
      );
    }

    const payload = toApplicationInsert(body);
    const result = await insertApplicationRow(payload, config);

    if (!result.ok) {
      console.error("[api/applications] Supabase insert failed", result);
      return NextResponse.json(
        { error: result.message || "Unable to submit application." },
        { status: result.status >= 400 ? result.status : 500 },
      );
    }

    console.log("[api/applications] Insert succeeded");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/applications] Unexpected error:", error);
    return NextResponse.json({ error: "Unable to submit application." }, { status: 500 });
  }
}

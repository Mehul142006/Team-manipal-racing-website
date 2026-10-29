import { NextResponse } from "next/server";
import { ensureDatabase } from "@/lib/db";
import {
  toApplicationInsert,
  validateApplicationForm,
  type ApplicationFormState,
} from "@/lib/recruitment";
import { clientIp, isCrossSitePost, rateLimit } from "@/lib/request-guards";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isCrossSitePost(request)) {
    return NextResponse.json({ error: "Unable to submit this application." }, { status: 403 });
  }

  if (!rateLimit(`application:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many applications were sent. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json()) as ApplicationFormState;
    const validationMessage = validateApplicationForm(body);
    if (validationMessage) {
      return NextResponse.json({ error: validationMessage }, { status: 400 });
    }

    const application = toApplicationInsert(body);
    if (
      application.full_name.length > 120 ||
      application.registration_number.length > 40 ||
      application.whatsapp_number.length !== 10
    ) {
      return NextResponse.json({ error: "Check the application details and try again." }, { status: 400 });
    }

    const sql = await ensureDatabase();
    const recent = await sql`
      select id
      from recruitment_applications
      where registration_number = ${application.registration_number}
        and whatsapp_number = ${application.whatsapp_number}
        and created_at > now() - interval '2 minutes'
      limit 1
    `;

    if (recent.length > 0) {
      return NextResponse.json(
        { error: "This application was just submitted. Please wait before sending it again." },
        { status: 409 },
      );
    }

    await sql`
      insert into recruitment_applications (
        full_name,
        registration_number,
        whatsapp_number,
        preference_1,
        preference_2
      )
      values (
        ${application.full_name},
        ${application.registration_number},
        ${application.whatsapp_number},
        ${application.preference_1},
        ${application.preference_2}
      )
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/applications] Unable to save application.");
    const missingDatabase = error instanceof Error && error.message === "DATABASE_URL is not configured.";
    return NextResponse.json(
      {
        error: missingDatabase
          ? "Applications are not configured yet. Please try again later."
          : "Unable to submit application.",
      },
      { status: missingDatabase ? 503 : 500 },
    );
  }
}

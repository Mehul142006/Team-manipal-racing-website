import { NextResponse } from "next/server";
import { validateContactSubmission } from "@/lib/contact-validation";
import { ensureDatabase } from "@/lib/db";
import { clientIp, isCrossSitePost, rateLimit } from "@/lib/request-guards";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isCrossSitePost(request)) {
    return NextResponse.json({ error: "Unable to submit this message." }, { status: 403 });
  }

  if (!rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many messages were sent. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      subject?: unknown;
      message?: unknown;
    };
    const input = {
      name: typeof body.name === "string" ? body.name : "",
      email: typeof body.email === "string" ? body.email : "",
      subject: typeof body.subject === "string" ? body.subject : "",
      message: typeof body.message === "string" ? body.message : "",
    };
    const validationMessage = validateContactSubmission(input);
    if (validationMessage) {
      return NextResponse.json({ error: validationMessage }, { status: 400 });
    }

    const name = input.name.trim();
    const email = input.email.trim();
    const subject = input.subject.trim();
    const message = input.message.trim();
    const sql = await ensureDatabase();
    const recent = await sql`
      select id
      from contact_submissions
      where lower(email) = lower(${email})
        and message = ${message}
        and created_at > now() - interval '2 minutes'
      limit 1
    `;

    if (recent.length > 0) {
      return NextResponse.json(
        { error: "This message was just submitted. Please wait before sending it again." },
        { status: 409 },
      );
    }

    await sql`
      insert into contact_submissions (name, email, subject, message)
      values (${name}, ${email}, ${subject || null}, ${message})
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Unable to save submission.");
    const missingDatabase = error instanceof Error && error.message === "DATABASE_URL is not configured.";
    return NextResponse.json(
      {
        error: missingDatabase
          ? "The contact form is not configured yet. Please try again later."
          : "Unable to send your message. Please try again.",
      },
      { status: missingDatabase ? 503 : 500 },
    );
  }
}

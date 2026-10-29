import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ContactSubmission, RecruitmentApplication } from "@/lib/admin-records";
import { ADMIN_COOKIE, readSessionToken } from "@/lib/admin-session";
import { ensureDatabase } from "@/lib/db";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = await readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  return session;
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const sql = await ensureDatabase();
  const rows = await sql`
    select id, name, email, subject, message, created_at
    from contact_submissions
    order by created_at desc
    limit 500
  `;

  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    subject: row.subject ? String(row.subject) : null,
    message: String(row.message),
    createdAt: new Date(row.created_at as string).toISOString(),
  }));
}

export async function listRecruitmentApplications(): Promise<RecruitmentApplication[]> {
  const sql = await ensureDatabase();
  const rows = await sql`
    select id, full_name, registration_number, whatsapp_number, preference_1, preference_2, created_at
    from recruitment_applications
    order by created_at desc
    limit 500
  `;

  return rows.map((row) => ({
    id: String(row.id),
    fullName: String(row.full_name),
    registrationNumber: String(row.registration_number),
    whatsappNumber: String(row.whatsapp_number),
    preference1: String(row.preference_1),
    preference2: String(row.preference_2),
    createdAt: new Date(row.created_at as string).toISOString(),
  }));
}

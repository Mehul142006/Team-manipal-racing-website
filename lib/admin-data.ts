import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type {
  ContactSubmission,
  ContactView,
  RecruitmentApplication,
  SubmissionAction,
} from "@/lib/admin-records";
import { ADMIN_COOKIE, readSessionToken } from "@/lib/admin-session";
import { ensureDatabase } from "@/lib/db";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = await readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  return session;
}

function mapSubmission(row: Record<string, unknown>): ContactSubmission {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    subject: row.subject ? String(row.subject) : null,
    message: String(row.message),
    isStarred: Boolean(row.is_starred),
    deletedAt: row.deleted_at ? new Date(row.deleted_at as string).toISOString() : null,
    createdAt: new Date(row.created_at as string).toISOString(),
  };
}

export async function listContactSubmissions(view: ContactView = "inbox"): Promise<ContactSubmission[]> {
  const sql = await ensureDatabase();
  const rows =
    view === "trash"
      ? await sql`
          select id, name, email, subject, message, is_starred, deleted_at, created_at
          from contact_submissions
          where deleted_at is not null
          order by deleted_at desc
          limit 500
        `
      : view === "starred"
        ? await sql`
            select id, name, email, subject, message, is_starred, deleted_at, created_at
            from contact_submissions
            where deleted_at is null and is_starred = true
            order by created_at desc
            limit 500
          `
        : await sql`
            select id, name, email, subject, message, is_starred, deleted_at, created_at
            from contact_submissions
            where deleted_at is null
            order by created_at desc
            limit 500
          `;

  return rows.map((row) => mapSubmission(row as Record<string, unknown>));
}

export async function updateContactSubmission(id: string, action: SubmissionAction): Promise<boolean> {
  if (!/^\d+$/.test(id)) return false;
  const numericId = Number(id);
  if (!Number.isSafeInteger(numericId) || numericId <= 0) return false;

  const sql = await ensureDatabase();
  const rows =
    action === "star"
      ? await sql`
          update contact_submissions
          set is_starred = true
          where id = ${numericId} and deleted_at is null
          returning id
        `
      : action === "unstar"
        ? await sql`
            update contact_submissions
            set is_starred = false
            where id = ${numericId} and deleted_at is null
            returning id
          `
        : action === "trash"
          ? await sql`
              update contact_submissions
              set deleted_at = now()
              where id = ${numericId} and deleted_at is null
              returning id
            `
          : action === "restore"
            ? await sql`
                update contact_submissions
                set deleted_at = null
                where id = ${numericId} and deleted_at is not null
                returning id
              `
            : await sql`
                delete from contact_submissions
                where id = ${numericId} and deleted_at is not null
                returning id
              `;

  return rows.length > 0;
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

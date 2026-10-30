import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sqlClient: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function getDatabaseUrl(): string | null {
  const value = process.env.DATABASE_URL?.trim();
  return value ? value : null;
}

export function getSql() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) return null;
  if (!sqlClient) sqlClient = neon(databaseUrl);
  return sqlClient;
}

export async function ensureDatabase() {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        create table if not exists contact_submissions (
          id bigint generated always as identity primary key,
          name text not null,
          email text not null,
          subject text,
          message text not null,
          is_starred boolean not null default false,
          deleted_at timestamptz,
          created_at timestamptz not null default now()
        )
      `;
      await sql`
        alter table contact_submissions
          add column if not exists is_starred boolean not null default false
      `;
      await sql`
        alter table contact_submissions
          add column if not exists deleted_at timestamptz
      `;
      await sql`
        create index if not exists contact_submissions_created_at_idx
          on contact_submissions (created_at desc)
      `;
      await sql`
        create table if not exists recruitment_applications (
          id bigint generated always as identity primary key,
          full_name text not null,
          registration_number text not null,
          whatsapp_number text not null,
          preference_1 text not null,
          preference_2 text not null,
          created_at timestamptz not null default now()
        )
      `;
      await sql`
        create index if not exists recruitment_applications_created_at_idx
          on recruitment_applications (created_at desc)
      `;
    })().catch((error: unknown) => {
      schemaReady = null;
      throw error;
    });
  }

  await schemaReady;
  return sql;
}

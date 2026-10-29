-- Apply in the Neon SQL editor, or let the server create these tables
-- on the first request after DATABASE_URL is set.

create table if not exists contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on contact_submissions (created_at desc);

create table if not exists recruitment_applications (
  id bigint generated always as identity primary key,
  full_name text not null,
  registration_number text not null,
  whatsapp_number text not null,
  preference_1 text not null,
  preference_2 text not null,
  created_at timestamptz not null default now()
);

create index if not exists recruitment_applications_created_at_idx
  on recruitment_applications (created_at desc);

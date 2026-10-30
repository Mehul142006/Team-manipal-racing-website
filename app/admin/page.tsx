import type { ReactNode } from "react";
import Link from "next/link";
import { ContactSubmissionList, RecruitmentApplicationList } from "@/components/admin/SubmissionRecords";
import {
  listContactSubmissions,
  listRecruitmentApplications,
  requireAdminSession,
} from "@/lib/admin-data";
import type { ContactView } from "@/lib/admin-records";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  await requireAdminSession();
  const params = await searchParams;
  const tab: ContactView | "recruitment" =
    params.tab === "starred" || params.tab === "trash" || params.tab === "recruitment" ? params.tab : "inbox";

  let loadError = false;
  let submissions: Awaited<ReturnType<typeof listContactSubmissions>> = [];
  let applications: Awaited<ReturnType<typeof listRecruitmentApplications>> = [];

  try {
    if (tab === "recruitment") {
      applications = await listRecruitmentApplications();
    } else {
      submissions = await listContactSubmissions(tab);
    }
  } catch {
    loadError = true;
  }

  let content: ReactNode;
  if (loadError) {
    content = (
      <div className="rounded-2xl border border-orange/40 px-6 py-10 text-sm text-orange">
        Submissions could not be loaded. Check that DATABASE_URL is set for this deployment, then refresh.
      </div>
    );
  } else if (tab === "recruitment") {
    content = <RecruitmentApplicationList applications={applications} />;
  } else {
    content = <ContactSubmissionList submissions={submissions} view={tab} />;
  }

  return (
    <section>
      <nav className="mb-6 flex flex-wrap gap-2" aria-label="Admin sections">
        <Link
          href="/admin"
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
            tab === "inbox" ? "bg-white text-midnight" : "border border-white/10 text-muted"
          }`}
        >
          Inbox
        </Link>
        <Link
          href="/admin?tab=starred"
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
            tab === "starred" ? "bg-white text-midnight" : "border border-white/10 text-muted"
          }`}
        >
          Starred
        </Link>
        <Link
          href="/admin?tab=trash"
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
            tab === "trash" ? "bg-white text-midnight" : "border border-white/10 text-muted"
          }`}
        >
          Trash
        </Link>
        <Link
          href="/admin?tab=recruitment"
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
            tab === "recruitment" ? "bg-white text-midnight" : "border border-white/10 text-muted"
          }`}
        >
          Recruitment Applications
        </Link>
      </nav>
      {content}
    </section>
  );
}

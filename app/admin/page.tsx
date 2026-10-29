import type { ReactNode } from "react";
import Link from "next/link";
import { ContactSubmissionList, RecruitmentApplicationList } from "@/components/admin/SubmissionRecords";
import { listContactSubmissions, listRecruitmentApplications, requireAdminSession } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  await requireAdminSession();
  const params = await searchParams;
  const tab = params.tab === "recruitment" ? "recruitment" : "contact";

  let loadError = false;
  let submissions: Awaited<ReturnType<typeof listContactSubmissions>> = [];
  let applications: Awaited<ReturnType<typeof listRecruitmentApplications>> = [];

  try {
    if (tab === "recruitment") {
      applications = await listRecruitmentApplications();
    } else {
      submissions = await listContactSubmissions();
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
    content = <ContactSubmissionList submissions={submissions} />;
  }

  return (
    <section>
      <nav className="mb-6 flex flex-wrap gap-2" aria-label="Admin sections">
        <Link
          href="/admin"
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-widest ${
            tab === "contact" ? "bg-white text-midnight" : "border border-white/10 text-muted"
          }`}
        >
          Contact Submissions
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

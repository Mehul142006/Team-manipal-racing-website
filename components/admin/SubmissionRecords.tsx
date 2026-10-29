"use client";

import { useState } from "react";
import {
  formatSubmissionTime,
  type ContactSubmission,
  type RecruitmentApplication,
} from "@/lib/admin-records";

function RecordCard({
  title,
  meta,
  preview,
  details,
}: {
  title: string;
  meta: string;
  preview: string;
  details: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
        aria-expanded={open}
      >
        <span>
          <span className="block font-semibold text-white">{title}</span>
          <span className="mt-1 block text-sm text-muted">{meta}</span>
          {!open && <span className="mt-2 block line-clamp-2 text-sm text-white/80">{preview}</span>}
        </span>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-accent">
          {open ? "Close" : "Read"}
        </span>
      </button>
      {open && (
        <dl className="space-y-3 border-t border-white/10 px-4 py-4 sm:px-5">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-accent">{detail.label}</dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-white/90">{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

export function ContactSubmissionList({ submissions }: { submissions: ContactSubmission[] }) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 px-6 py-12 text-center text-sm text-muted">
        No contact submissions yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((submission) => (
        <RecordCard
          key={submission.id}
          title={submission.name}
          meta={`${submission.email} · ${formatSubmissionTime(submission.createdAt)}`}
          preview={submission.subject || submission.message}
          details={[
            { label: "Name", value: submission.name },
            { label: "Email", value: submission.email },
            { label: "Subject", value: submission.subject || "—" },
            { label: "Message", value: submission.message },
            { label: "Submitted", value: formatSubmissionTime(submission.createdAt) },
          ]}
        />
      ))}
    </div>
  );
}

export function RecruitmentApplicationList({
  applications,
}: {
  applications: RecruitmentApplication[];
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 px-6 py-12 text-center text-sm text-muted">
        No recruitment applications yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((application) => (
        <RecordCard
          key={application.id}
          title={application.fullName}
          meta={`${application.registrationNumber} · ${formatSubmissionTime(application.createdAt)}`}
          preview={`${application.preference1} / ${application.preference2}`}
          details={[
            { label: "Name", value: application.fullName },
            { label: "Registration number", value: application.registrationNumber },
            { label: "WhatsApp", value: application.whatsappNumber },
            { label: "Preference 1", value: application.preference1 },
            { label: "Preference 2", value: application.preference2 },
            { label: "Submitted", value: formatSubmissionTime(application.createdAt) },
          ]}
        />
      ))}
    </div>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  formatSubmissionTime,
  type ContactSubmission,
  type RecruitmentApplication,
  type ContactView,
  type SubmissionAction,
} from "@/lib/admin-records";

function RecordCard({
  title,
  meta,
  preview,
  details,
  actions,
}: {
  title: string;
  meta: string;
  preview: string;
  details: { label: string; value: string }[];
  actions?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300">
      <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
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
        {actions}
      </div>
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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M12 3.2 14.7 8.7 20.8 9.6 16.4 13.9 17.4 20 12 17.1 6.6 20 7.6 13.9 3.2 9.6 9.3 8.7 12 3.2Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CONFIRM_COPY: Partial<Record<SubmissionAction, { title: string; body: string; confirm: string }>> = {
  trash: {
    title: "Move to Trash?",
    body: "This message will leave the inbox. You can restore it from Trash.",
    confirm: "Move to Trash",
  },
  purge: {
    title: "Delete permanently?",
    body: "This message will be removed forever and cannot be restored.",
    confirm: "Delete permanently",
  },
};

export function ContactSubmissionList({
  submissions,
  view,
}: {
  submissions: ContactSubmission[];
  view: ContactView;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<{ id: string; action: SubmissionAction } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(id: string, action: SubmissionAction) {
    setBusyId(id);
    setError(null);
    try {
      const response = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!response.ok) {
        setError("That change could not be saved. Refresh the page and try again.");
        return;
      }
      router.refresh();
    } catch {
      setError("That change could not be saved. Refresh the page and try again.");
    } finally {
      setBusyId(null);
      setPending(null);
    }
  }

  function requestAction(id: string, action: SubmissionAction) {
    if (action === "trash" || action === "purge") {
      setPending({ id, action });
      return;
    }
    void run(id, action);
  }

  if (submissions.length === 0) {
    const empty =
      view === "starred"
        ? "No starred messages."
        : view === "trash"
          ? "Trash is empty."
          : "No contact submissions yet.";
    return (
      <div className="rounded-2xl border border-white/10 px-6 py-12 text-center text-sm text-muted">{empty}</div>
    );
  }

  const confirm = pending ? CONFIRM_COPY[pending.action] : null;

  return (
    <div className="space-y-3">
      {error && (
        <p className="rounded-xl border border-orange/40 px-4 py-3 text-sm text-orange" role="alert">
          {error}
        </p>
      )}
      {submissions.map((submission) => (
        <RecordCard
          key={submission.id}
          title={submission.name}
          meta={`${submission.email} · ${formatSubmissionTime(submission.createdAt)}${
            submission.isStarred && view !== "starred" ? " · Starred" : ""
          }`}
          preview={submission.subject || submission.message}
          details={[
            { label: "Name", value: submission.name },
            { label: "Email", value: submission.email },
            { label: "Subject", value: submission.subject || "—" },
            { label: "Message", value: submission.message },
            { label: "Submitted", value: formatSubmissionTime(submission.createdAt) },
          ]}
          actions={
            <div className="flex shrink-0 items-center gap-1">
              {view !== "trash" && (
                <button
                  type="button"
                  aria-pressed={submission.isStarred}
                  aria-label={submission.isStarred ? "Remove star" : "Star message"}
                  disabled={busyId === submission.id}
                  onClick={() => requestAction(submission.id, submission.isStarred ? "unstar" : "star")}
                  className={`rounded-lg p-2 transition-colors duration-300 ${
                    submission.isStarred ? "text-amber-300" : "text-muted hover:text-amber-200"
                  }`}
                >
                  <StarIcon filled={submission.isStarred} />
                </button>
              )}
              {view === "trash" ? (
                <>
                  <button
                    type="button"
                    disabled={busyId === submission.id}
                    onClick={() => requestAction(submission.id, "restore")}
                    className="rounded-lg px-2 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
                  >
                    Restore
                  </button>
                  <button
                    type="button"
                    disabled={busyId === submission.id}
                    onClick={() => requestAction(submission.id, "purge")}
                    className="rounded-lg px-2 py-2 text-[10px] font-semibold uppercase tracking-widest text-orange transition-colors hover:text-white"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  aria-label="Move to trash"
                  disabled={busyId === submission.id}
                  onClick={() => requestAction(submission.id, "trash")}
                  className="rounded-lg p-2 text-muted transition-colors duration-300 hover:text-orange"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                    <path
                      d="M4 7h16M9 7V5h6v2m-7 0 1 12h6l1-12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          }
        />
      ))}

      {confirm && pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-midnight p-6 shadow-[0_0_32px_rgba(255,122,24,0.12)]">
            <h2 className="text-lg font-bold text-white">{confirm.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{confirm.body}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void run(pending.id, pending.action)}
                className="rounded-xl bg-orange px-4 py-2 text-xs font-semibold uppercase tracking-widest text-midnight"
              >
                {confirm.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
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

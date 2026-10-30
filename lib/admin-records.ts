export type ContactView = "inbox" | "starred" | "trash";

export type SubmissionAction = "star" | "unstar" | "trash" | "restore" | "purge";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isStarred: boolean;
  deletedAt: string | null;
  createdAt: string;
};

export type RecruitmentApplication = {
  id: string;
  fullName: string;
  registrationNumber: string;
  whatsappNumber: string;
  preference1: string;
  preference2: string;
  createdAt: string;
};

const timeFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export function formatSubmissionTime(value: string | Date): string {
  return timeFormat.format(new Date(value));
}

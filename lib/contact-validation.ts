export type ContactSubmissionInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactSubmission(input: ContactSubmissionInput): string | null {
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!name) return "Name is required.";
  if (name.length > 120) return "Name must be 120 characters or fewer.";
  if (!email) return "Email is required.";
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  if (subject.length > 160) return "Subject must be 160 characters or fewer.";
  if (!message) return "Message is required.";
  if (message.length > 5000) return "Message must be 5000 characters or fewer.";
  return null;
}

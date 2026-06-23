export const RECRUITMENT_SUBSYSTEMS = [
  "Structures",
  "Transmission",
  "Vehicle Dynamics",
  "Electronics",
  "Data Acquisition",
  "Electric Powertrain",
  "Research & Development",
  "Management",
] as const;

export type RecruitmentSubsystem = (typeof RECRUITMENT_SUBSYSTEMS)[number];

export type ApplicationFormState = {
  name: string;
  registrationNumber: string;
  whatsappNumber: string;
  preference1: "" | RecruitmentSubsystem;
  preference2: "" | RecruitmentSubsystem;
};

export type ApplicationInsert = {
  full_name: string;
  registration_number: string;
  whatsapp_number: string;
  preference_1: RecruitmentSubsystem;
  preference_2: RecruitmentSubsystem;
};

export const EMPTY_APPLICATION_FORM: ApplicationFormState = {
  name: "",
  registrationNumber: "",
  whatsappNumber: "",
  preference1: "",
  preference2: "",
};

export function validateApplicationForm(form: ApplicationFormState): string | null {
  if (!form.name.trim()) return "Full Name is required.";
  if (!form.registrationNumber.trim()) return "Registration Number is required.";
  if (!form.whatsappNumber.trim()) return "WhatsApp Number is required.";
  if (!form.preference1) return "Preference 1 is required.";
  if (!form.preference2) return "Preference 2 is required.";
  if (form.preference1 === form.preference2) {
    return "Preference 1 and Preference 2 must be different.";
  }

  return null;
}

export function toApplicationInsert(form: ApplicationFormState): ApplicationInsert {
  return {
    full_name: form.name.trim(),
    registration_number: form.registrationNumber.trim(),
    whatsapp_number: form.whatsappNumber.trim(),
    preference_1: form.preference1 as RecruitmentSubsystem,
    preference_2: form.preference2 as RecruitmentSubsystem,
  };
}

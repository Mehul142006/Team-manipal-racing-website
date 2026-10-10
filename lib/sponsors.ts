export type SponsorItem = {
  id: string;
  name: string;
  logo: string;
  hasLogo: boolean;
  tier: SponsorTier;
};

export type SponsorTier = "title" | "major" | "technical" | "supporting";

export const SPONSOR_PLACEHOLDER = "/sponsors/placeholder.svg";

const LOGO_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif"]);

export function isSponsorLogoFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return LOGO_EXTENSIONS.has(ext);
}

export function isPlaceholderAsset(filename: string): boolean {
  return filename.toLowerCase().startsWith("placeholder");
}

/** Section imagery in public/sponsors — not a partner logo. */
export function isSponsorSectionAsset(filename: string): boolean {
  const base = filename.replace(/\.[^.]+$/, "");
  return normalizeSponsorKey(base) === normalizeSponsorKey("Become_a_sponsor");
}

/** Display names for logo files where the filename casing differs from the official sponsor name. */
export const SPONSOR_DISPLAY_NAME_BY_FILE: Record<string, string> = {
  "AUTOSMITH ADVANCED AUTOMOBILE DETAILING.jpeg": "Autosmith Advanced Automobile Detailing",
  "OUTLOOK INTERIOR PVT. LTD..jpeg": "Outlook Interior Pvt. Ltd.",
};

export function sponsorDisplayNameForFile(filename: string): string {
  return SPONSOR_DISPLAY_NAME_BY_FILE[filename] ?? formatSponsorName(filename);
}

/** Derive a readable sponsor name from a filename (e.g. Virya.png → Virya). */
export function formatSponsorName(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

export function normalizeSponsorKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

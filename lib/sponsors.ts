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

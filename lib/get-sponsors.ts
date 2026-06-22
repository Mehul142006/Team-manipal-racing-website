import fs from "node:fs";
import path from "node:path";
import { SPONSORS } from "./data";
import {
  formatSponsorName,
  isPlaceholderAsset,
  isSponsorLogoFile,
  normalizeSponsorKey,
  SPONSOR_PLACEHOLDER,
  type SponsorItem,
  type SponsorTier,
} from "./sponsors";

const SPONSORS_DIR = path.join(process.cwd(), "public", "sponsors");

function readLogoFiles(): string[] {
  if (!fs.existsSync(SPONSORS_DIR)) return [];

  return fs
    .readdirSync(SPONSORS_DIR)
    .filter((file) => !file.startsWith(".") && isSponsorLogoFile(file) && !isPlaceholderAsset(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function findMatchingLogo(sponsorName: string, files: string[], used: Set<string>): string | undefined {
  const normalizedName = normalizeSponsorKey(sponsorName);

  for (const file of files) {
    if (used.has(file)) continue;

    const normalizedFile = normalizeSponsorKey(formatSponsorName(file));
    if (
      normalizedName.includes(normalizedFile) ||
      normalizedFile.includes(normalizedName) ||
      normalizedName.startsWith(normalizedFile) ||
      normalizedFile.startsWith(normalizedName.slice(0, Math.max(normalizedFile.length, 3)))
    ) {
      return file;
    }
  }

  return undefined;
}

function tierForName(name: string): SponsorTier {
  const match = SPONSORS.find((sponsor) => sponsor.name === name);
  return match?.tier ?? "supporting";
}

/** Loads sponsor logos from public/sponsors and merges with named entries in lib/data. */
export function getSponsors(): SponsorItem[] {
  try {
    const files = readLogoFiles();
    const usedFiles = new Set<string>();
    const sponsors: SponsorItem[] = [];

    for (const sponsor of SPONSORS) {
      const matchedFile = findMatchingLogo(sponsor.name, files, usedFiles);

      if (matchedFile) {
        usedFiles.add(matchedFile);
        sponsors.push({
          id: matchedFile,
          name: sponsor.name,
          logo: `/sponsors/${encodeURIComponent(matchedFile)}`,
          hasLogo: true,
          tier: sponsor.tier,
        });
      } else {
        sponsors.push({
          id: sponsor.name,
          name: sponsor.name,
          logo: SPONSOR_PLACEHOLDER,
          hasLogo: false,
          tier: sponsor.tier,
        });
      }
    }

    for (const file of files) {
      if (usedFiles.has(file)) continue;

      const name = formatSponsorName(file);
      sponsors.push({
        id: file,
        name,
        logo: `/sponsors/${encodeURIComponent(file)}`,
        hasLogo: true,
        tier: tierForName(name),
      });
    }

    return sponsors;
  } catch {
    return SPONSORS.map((sponsor) => ({
      id: sponsor.name,
      name: sponsor.name,
      logo: SPONSOR_PLACEHOLDER,
      hasLogo: false,
      tier: sponsor.tier,
    }));
  }
}

export function getSponsorsByTier(): Record<SponsorTier, SponsorItem[]> {
  const sponsors = getSponsors();

  return {
    title: sponsors.filter((s) => s.tier === "title"),
    major: sponsors.filter((s) => s.tier === "major"),
    technical: sponsors.filter((s) => s.tier === "technical"),
    supporting: sponsors.filter((s) => s.tier === "supporting"),
  };
}

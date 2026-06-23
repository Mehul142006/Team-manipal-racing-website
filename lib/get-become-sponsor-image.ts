import fs from "node:fs";
import path from "node:path";

const SPONSORS_DIR = path.join(process.cwd(), "public", "sponsors");
const BECOME_SPONSOR_BASENAME = "Become_a_sponsor";
const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".avif", ".gif"];

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getBecomeSponsorImageUrl(): string {
  for (const ext of IMAGE_EXTENSIONS) {
    const filename = `${BECOME_SPONSOR_BASENAME}${ext}`;
    if (fs.existsSync(path.join(SPONSORS_DIR, filename))) {
      return `/sponsors/${encodeURIComponent(filename)}`;
    }
  }

  if (fs.existsSync(SPONSORS_DIR)) {
    const match = fs
      .readdirSync(SPONSORS_DIR)
      .find((file) => normalizeKey(file.replace(/\.[^.]+$/, "")) === normalizeKey(BECOME_SPONSOR_BASENAME));

    if (match) {
      return `/sponsors/${encodeURIComponent(match)}`;
    }
  }

  return `/sponsors/${encodeURIComponent(`${BECOME_SPONSOR_BASENAME}.jpeg`)}`;
}

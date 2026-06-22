export type ResearchDocument = {
  id: string;
  title: string;
  description: string;
  year: string;
  filename: string;
  url: string;
};

const PDF_EXTENSIONS = new Set([".pdf"]);

export function isResearchDocumentFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return PDF_EXTENSIONS.has(ext);
}

export function formatDocumentTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function extractDocumentYear(filename: string, fallbackYear: number): string {
  const match = filename.match(/\b(20\d{2})\b/);
  if (match) return match[1];
  return String(fallbackYear);
}

export function defaultDocumentDescription(title: string): string {
  return `Engineering research and technical documentation — ${title.toLowerCase()}.`;
}

/** Optional metadata overrides keyed by filename. */
export const RESEARCH_DOCUMENT_OVERRIDES: Record<
  string,
  Partial<Pick<ResearchDocument, "title" | "description" | "year">>
> = {
  "Battery_Study.pdf": {
    title: "Battery Thermal Analysis",
    description: "Research study on thermal behaviour of EV battery systems.",
    year: "2026",
  },
  "Research_Paper_1.pdf": {
    title: "Research Paper",
    description: "Technical paper documenting engineering analysis and design methodology.",
    year: "2026",
  },
  "Suspension_Analysis.pdf": {
    title: "Suspension Analysis",
    description: "Engineering study on vehicle suspension behaviour and design validation.",
    year: "2026",
  },
};

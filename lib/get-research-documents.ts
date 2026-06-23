import fs from "node:fs";
import path from "node:path";
import { RESEARCH_PUBLICATIONS, type ResearchDocument } from "./research-documents";

const DOCUMENTS_DIR = path.join(process.cwd(), "public", "documents");
const RESEARCH_THUMBNAILS_DIR = path.join(process.cwd(), "public", "research-thumbnails");

function fileExists(filename: string): boolean {
  return fs.existsSync(path.join(DOCUMENTS_DIR, filename));
}

function thumbnailFilenameForPdf(filename: string): string {
  return `${filename.replace(/\.[^.]+$/, "")}.png`;
}

function getExistingThumbnailUrl(filename: string): string | null {
  const thumbnailName = thumbnailFilenameForPdf(filename);
  const thumbnailPath = path.join(RESEARCH_THUMBNAILS_DIR, thumbnailName);
  if (!fs.existsSync(thumbnailPath)) return null;

  return `/research-thumbnails/${encodeURIComponent(thumbnailName)}`;
}

export async function getResearchDocuments(): Promise<ResearchDocument[]> {
  try {
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      return [];
    }

    const publications = RESEARCH_PUBLICATIONS.filter((publication) =>
      fileExists(publication.filename),
    ).sort((a, b) => Number(a.year) - Number(b.year) || a.title.localeCompare(b.title));

    return publications
      .map((publication) => {
        const thumbnailUrl = getExistingThumbnailUrl(publication.filename);

        return {
          id: publication.filename,
          filename: publication.filename,
          url: `/documents/${encodeURIComponent(publication.filename)}`,
          title: publication.title,
          authors: publication.authors,
          description: publication.description,
          year: publication.year,
          thumbnailUrl,
        } satisfies ResearchDocument;
      })
      .filter((document) => document.thumbnailUrl !== null);
  } catch (error) {
    console.error("[research-documents] Failed to load research publications:", error);
    return [];
  }
}

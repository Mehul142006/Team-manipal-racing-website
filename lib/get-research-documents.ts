import fs from "node:fs";
import path from "node:path";
import {
  defaultDocumentDescription,
  extractDocumentYear,
  formatDocumentTitle,
  isResearchDocumentFile,
  RESEARCH_DOCUMENT_OVERRIDES,
  type ResearchDocument,
} from "./research-documents";

const DOCUMENTS_DIR = path.join(process.cwd(), "public", "documents");

export function getResearchDocuments(): ResearchDocument[] {
  try {
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      return [];
    }

    const files = fs
      .readdirSync(DOCUMENTS_DIR)
      .filter((file) => !file.startsWith(".") && isResearchDocumentFile(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return files.map((filename) => {
      const override = RESEARCH_DOCUMENT_OVERRIDES[filename];
      const filePath = path.join(DOCUMENTS_DIR, filename);
      const stat = fs.statSync(filePath);
      const fallbackYear = stat.mtime.getFullYear();
      const derivedTitle = formatDocumentTitle(filename);

      return {
        id: filename,
        filename,
        url: `/documents/${encodeURIComponent(filename)}`,
        title: override?.title ?? derivedTitle,
        description: override?.description ?? defaultDocumentDescription(derivedTitle),
        year: override?.year ?? extractDocumentYear(filename, fallbackYear),
      };
    });
  } catch {
    return [];
  }
}

export type ResearchDocument = {
  id: string;
  title: string;
  authors: string;
  description: string;
  year: string;
  filename: string;
  url: string;
  thumbnailUrl: string | null;
};

export type ResearchPublicationMeta = {
  filename: string;
  title: string;
  authors: string;
  description: string;
  year: string;
};

const PDF_EXTENSIONS = new Set([".pdf"]);

export function isResearchDocumentFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return PDF_EXTENSIONS.has(ext);
}

export const RESEARCH_PUBLICATIONS: ResearchPublicationMeta[] = [
  {
    filename: "Conference_paper1.pdf",
    year: "2018",
    title:
      "Design, Fabrication and Testing of Carbon Fiber Reinforced Epoxy Drive Shaft for All Terrain Vehicle using Filament Winding",
    authors:
      "Suhas Yeshwant Nayak, Nishank Minil Amin, Srinivas Shenoy Heckadka, Vishal Shenoy P, Ch. Sravan Prakash, Ruthvik Mabbu",
    description:
      "Research on lightweight carbon-fiber composite drive shafts for Baja SAE all-terrain vehicles using filament winding technology.",
  },
  {
    filename: "Research1.pdf",
    year: "2019",
    title: "Product Marketability of an All-Terrain Vehicle in the Indian Context",
    authors: "Vinay Sharma, Shiva Prasad H.C.",
    description:
      "Market research and data-driven analysis investigating the growth potential and customer perception of ATVs in India.",
  },
  {
    filename: "Research3.pdf",
    year: "2019",
    title:
      "Static Analysis and Fatigue Life Prediction of Composite Leaf Springs of Automotive Suspension System",
    authors:
      "Nithesh Naik, Dheeraj Gosangi, Revati Borkhade, Ritesh Bhat, Dasharathraj Shetty, Samuel Schumann",
    description:
      "Finite element analysis and fatigue-life prediction of composite leaf springs for lightweight automotive suspension systems.",
  },
  {
    filename: "Research2.pdf",
    year: "2020",
    title: "Strategic Evaluation in Optimizing the Internal Supply Chain Using TOPSIS",
    authors: "Dilip U. Shenoy, Vinay Sharma, Shiva Prasad H.C.",
    description:
      "Supply chain optimization study using TOPSIS-based decision analysis for manufacturing operations.",
  },
];

const PUBLICATION_BY_FILENAME = new Map(
  RESEARCH_PUBLICATIONS.map((publication) => [publication.filename, publication]),
);

export function getPublicationMeta(filename: string): ResearchPublicationMeta | undefined {
  return PUBLICATION_BY_FILENAME.get(filename);
}

export function formatDocumentTitle(_filename: string): string {
  return "Research Publication";
}

export function extractDocumentYear(filename: string, fallbackYear: number): string {
  const meta = getPublicationMeta(filename);
  if (meta) return meta.year;

  const match = filename.match(/\b(20\d{2})\b/);
  if (match) return match[1];
  return String(fallbackYear);
}

export function defaultDocumentDescription(_title: string): string {
  return "Peer-reviewed engineering research publication from Team Manipal Racing Electric.";
}

/** @deprecated Use RESEARCH_PUBLICATIONS instead. */
export const RESEARCH_DOCUMENT_OVERRIDES: Record<
  string,
  Partial<Pick<ResearchDocument, "title" | "authors" | "description" | "year">>
> = Object.fromEntries(
  RESEARCH_PUBLICATIONS.map((publication) => [
    publication.filename,
    {
      title: publication.title,
      authors: publication.authors,
      description: publication.description,
      year: publication.year,
    },
  ]),
);

import { ResearchPageContent } from "@/components/media/ResearchPageContent";
import { getResearchDocuments } from "@/lib/get-research-documents";

export default async function ResearchPage() {
  const documents = await getResearchDocuments();

  return <ResearchPageContent documents={documents} />;
}

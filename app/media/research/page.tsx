import { PageHero } from "@/components/ui/GlassCard";
import { ResearchDocumentCard } from "@/components/media/ResearchDocumentCard";
import { getResearchDocuments } from "@/lib/get-research-documents";

export default function ResearchPage() {
  const documents = getResearchDocuments();

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Research & Development"
        description="Engineering knowledge, publications, technical reports and research contributions from Team Manipal Racing Electric."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {documents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {documents.map((document, index) => (
                <ResearchDocumentCard key={document.id} document={document} delay={index * 0.04} />
              ))}
            </div>
          ) : (
            <div className="liquid-glass rounded-3xl border border-white/8 px-8 py-12 text-center">
              <p className="text-sm leading-relaxed text-muted">
                Research documents will appear here automatically when PDF files are added to{" "}
                <code className="text-accent">public/documents/</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

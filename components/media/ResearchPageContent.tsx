"use client";

import { motion } from "framer-motion";
import type { ResearchDocument } from "@/lib/research-documents";
import { ResearchDocumentCard } from "@/components/media/ResearchDocumentCard";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";

type ResearchPageContentProps = {
  documents: ResearchDocument[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ResearchPageContent({ documents }: ResearchPageContentProps) {
  return (
    <>
      <section className="research-hero relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="research-page-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="research-streaks pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-accent"
          >
            Media
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-4 max-w-5xl text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Research &amp; Development
          </motion.h1>

          <SectionTitleAccent size="lg" className="mt-5" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Engineering innovation through simulation, design optimization and experimental
            validation.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="research-page-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="research-streaks pointer-events-none absolute inset-0 opacity-80" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {documents.length > 0 ? (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
              {documents.map((document, index) => (
                <ResearchDocumentCard key={document.id} document={document} delay={index * 0.08} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="liquid-glass mx-auto max-w-2xl rounded-3xl border border-white/8 px-8 py-12 text-center"
            >
              <p className="text-sm leading-relaxed text-muted">
                Research documents will appear here automatically when PDF files are added to{" "}
                <code className="text-accent">public/documents/</code>.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

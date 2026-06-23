"use client";

import { motion } from "framer-motion";
import type { ResearchDocument } from "@/lib/research-documents";
import { SectionTitleAccent } from "@/components/ui/SectionTitleAccent";

type ResearchDocumentCardProps = {
  document: ResearchDocument;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ResearchDocumentCard({ document, delay = 0 }: ResearchDocumentCardProps) {
  if (!document.thumbnailUrl) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease }}
      className="h-full [perspective:1200px]"
    >
      <motion.a
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${document.title} PDF in a new tab`}
        whileHover={{ y: -12, rotateX: 2, rotateY: -1.5, scale: 1.015 }}
        transition={{ duration: 0.35, ease }}
        className="research-doc-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(6,8,12,0.82)] shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <div className="research-doc-card-grid pointer-events-none absolute inset-0 rounded-[inherit] opacity-40" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-orange/12 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ff6b00]/10 blur-3xl transition-all duration-500 group-hover:bg-[#ff6b00]/20" />

        <div className="research-pdf-preview-frame relative border-b border-white/8 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
          <div className="research-pdf-preview-glow relative mx-auto max-w-[15rem] overflow-hidden rounded-xl border border-white/10 bg-black/45 p-2 backdrop-blur-md sm:max-w-[16rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={document.thumbnailUrl}
              alt={`First page preview of ${document.title}`}
              loading="lazy"
              decoding="async"
              className="aspect-[210/297] w-full object-contain object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>

          <span className="absolute left-6 top-6 rounded-full border border-[#ff6b00]/35 bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-[#ff8c42] backdrop-blur-sm sm:left-7 sm:top-7">
            {document.year}
          </span>
        </div>

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#ffb066] sm:text-lg">
            {document.title}
          </h3>
          <SectionTitleAccent size="sm" className="mt-3" />
          <p className="mt-4 text-xs leading-relaxed text-white/55 sm:text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-white/45">Authors · </span>
            {document.authors}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{document.description}</p>

          <div className="mt-6 border-t border-white/8 pt-5">
            <span className="research-read-paper-btn inline-flex items-center rounded-xl px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Read Paper
            </span>
          </div>
        </div>
      </motion.a>
    </motion.article>
  );
}

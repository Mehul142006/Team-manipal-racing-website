"use client";

import { motion } from "framer-motion";
import type { ResearchDocument } from "@/lib/research-documents";

type ResearchDocumentCardProps = {
  document: ResearchDocument;
  delay?: number;
};

export function ResearchDocumentCard({ document, delay = 0 }: ResearchDocumentCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="research-doc-card liquid-glass flex h-full flex-col rounded-2xl border border-white/8 p-6 sm:p-7"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/35 text-accent ring-1 ring-orange/20">
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12h6M9 16h6M13 3H8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V8l-5-5z" />
          <path d="M13 3v5h5" />
        </svg>
      </div>

      <h3 className="mt-5 text-lg font-bold leading-snug text-white">{document.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{document.description}</p>
      <p className="mt-5 font-mono text-sm font-semibold text-accent">{document.year}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={document.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex rounded-xl px-4 py-2.5 text-[11px]"
        >
          View PDF
        </a>
        <a
          href={document.url}
          download={document.filename}
          className="liquid-glass liquid-glass-btn inline-flex rounded-xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white"
        >
          Download
        </a>
      </div>
    </motion.article>
  );
}

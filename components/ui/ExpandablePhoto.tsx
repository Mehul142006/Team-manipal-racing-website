"use client";

import { useEffect, useId, useState } from "react";

type ExpandablePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
};

export function ExpandablePhoto({
  src,
  alt,
  className = "",
  frameClassName = "",
}: ExpandablePhotoProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <figure className={frameClassName}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 text-left shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={`block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.015] ${className}`}
          />
        </button>
        <figcaption className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Select the image to view it in full
        </figcaption>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <p id={titleId} className="sr-only">
              {alt}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-11 right-0 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

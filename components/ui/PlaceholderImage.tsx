"use client";

import Image from "next/image";
import { useState } from "react";

type PlaceholderImageProps = {
  src?: string;
  alt: string;
  gradient?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

export function PlaceholderImage({
  src,
  alt,
  gradient = "from-navy via-steel to-midnight",
  className = "",
  fill,
  width,
  height,
  priority,
  objectFit,
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;
  const resolvedFit =
    objectFit ??
    (className.includes("object-contain")
      ? "contain"
      : className.includes("object-cover")
        ? "cover"
        : "cover");

  if (showPlaceholder) {
    if (fill) {
      return (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} ${className}`}
          aria-label={alt}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-25">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-3 max-w-[80%] text-center text-[10px] uppercase tracking-widest text-white/60">
              {alt}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
        style={{ width, height }}
        aria-label={alt}
      >
        <svg className="h-8 w-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const fitClass = resolvedFit === "contain" ? "object-contain" : "object-cover";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`${fitClass} ${className}`}
        onError={() => setFailed(true)}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={`${fitClass} ${className}`}
      onError={() => setFailed(true)}
      priority={priority}
    />
  );
}

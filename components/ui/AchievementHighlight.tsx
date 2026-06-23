export function TrophyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 text-orange ${className}`}
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v3a5 5 0 01-10 0V4z" />
      <path d="M5 4H3v2a2 2 0 002 2" />
      <path d="M19 4h2v2a2 2 0 01-2 2" />
    </svg>
  );
}

export function highlightRanking(title: string) {
  const parts = title.split(/(\d+(?:st|nd|rd|th)?|Top \d+)/gi);
  return parts.map((part, index) =>
    /^\d|Top/i.test(part) ? (
      <span key={index} className="text-xl font-bold text-orange sm:text-2xl">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

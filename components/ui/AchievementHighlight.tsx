export function TrophyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`shrink-0 text-orange ${className}`}
    >
      <path d="M6 3h12v2a4 4 0 01-3.78 3.997L14 19h3v2H7v-2h3l-.22-10.003A4 4 0 016 5V3zm2 2v0a2 2 0 002 1.85V17h4V6.85A2 2 0 0016 5V5H8zm1 18h6v1H9v-1z" />
    </svg>
  );
}

export function highlightRanking(title: string) {
  const parts = title.split(/(\d+(?:st|nd|rd|th)?|Top \d+)/gi);
  return parts.map((part, index) =>
    /^\d|Top/i.test(part) ? (
      <span key={index} className="font-bold text-orange">
        {part}
      </span>
    ) : (
      part
    )
  );
}

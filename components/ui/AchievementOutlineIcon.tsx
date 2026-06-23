export type AchievementIconType = "trophy" | "medal" | "vehicle" | "lightning" | "flag" | "trend";

type AchievementOutlineIconProps = {
  type: AchievementIconType;
  className?: string;
};

export function AchievementOutlineIcon({ type, className = "h-7 w-7" }: AchievementOutlineIconProps) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: `shrink-0 text-orange ${className}`,
  };

  switch (type) {
    case "lightning":
      return (
        <svg {...props}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "trend":
      return (
        <svg {...props}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "flag":
      return (
        <svg {...props}>
          <path d="M4 21V4" />
          <path d="M4 4h12l-2 3 2 3H4" />
        </svg>
      );
    case "vehicle":
      return (
        <svg {...props}>
          <path d="M5 17h14v-5l-2-4H7l-2 4v5z" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
          <path d="M5 12h14" />
        </svg>
      );
    case "medal":
      return (
        <svg {...props}>
          <circle cx="12" cy="14" r="5" />
          <path d="M8.5 9L7 3l5 3 5-3-1.5 6" />
        </svg>
      );
    case "trophy":
    default:
      return (
        <svg {...props}>
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 4h10v3a5 5 0 01-10 0V4z" />
          <path d="M5 4H3v2a2 2 0 002 2" />
          <path d="M19 4h2v2a2 2 0 01-2 2" />
        </svg>
      );
  }
}

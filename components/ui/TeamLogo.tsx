import Image from "next/image";
import { LOGO } from "@/lib/data";

type TeamLogoProps = {
  variant?: "nav" | "footer" | "loading";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  nav: { height: 56, className: "h-14 sm:h-16" },
  footer: { height: 60, className: "h-[60px]" },
  loading: { height: 80, className: "h-20" },
} as const;

export function TeamLogo({
  variant = "nav",
  className = "",
  priority = false,
}: TeamLogoProps) {
  const { height, className: sizeClass } = SIZES[variant];

  return (
    <Image
      src={LOGO.src}
      alt={LOGO.alt}
      width={height * 4}
      height={height}
      priority={priority}
      className={`w-auto shrink-0 object-contain ${sizeClass} ${className}`}
    />
  );
}

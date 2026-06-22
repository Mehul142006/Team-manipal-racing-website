type SectionTitleAccentProps = {
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function SectionTitleAccent({
  align = "left",
  size = "md",
  className = "",
}: SectionTitleAccentProps) {
  const sizeClass =
    size === "sm" ? "section-title-accent-sm" : size === "lg" ? "section-title-accent-lg" : "";

  return (
    <div
      aria-hidden
      className={[
        "section-title-accent",
        sizeClass,
        align === "center" ? "section-title-accent-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

type SectionWatermarkProps = {
  text: string;
  align?: "center" | "left";
};

export function SectionWatermark({ text, align = "center" }: SectionWatermarkProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 flex overflow-hidden ${
        align === "left" ? "items-center justify-start pl-4 sm:pl-8" : "items-center justify-center"
      }`}
    >
      <span className="select-none whitespace-nowrap text-[clamp(3.5rem,16vw,12rem)] font-bold uppercase tracking-[0.06em] text-white/[0.035]">
        {text}
      </span>
    </div>
  );
}

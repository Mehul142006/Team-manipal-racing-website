type HomePhotoCardProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  maxWidthClass?: string;
};

export function HomePhotoCard({
  src,
  alt,
  priority = false,
  className = "",
  maxWidthClass = "max-w-[520px]",
}: HomePhotoCardProps) {
  return (
    <div
      className={`group w-full ${maxWidthClass} liquid-glass liquid-glass-card overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.45)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </div>
  );
}

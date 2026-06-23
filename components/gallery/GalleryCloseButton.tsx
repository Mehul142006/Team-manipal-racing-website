type GalleryCloseButtonProps = {
  onClose: () => void;
  className?: string;
};

export function GalleryCloseButton({ onClose, className = "" }: GalleryCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="Close gallery"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
      className={`gallery-modal-close fixed z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-lg text-white backdrop-blur-sm transition-colors hover:border-orange/35 hover:bg-black/80 hover:text-accent ${className}`}
    >
      ✕
    </button>
  );
}

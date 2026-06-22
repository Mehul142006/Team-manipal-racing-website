"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MEDIA_NAV_ITEMS } from "@/lib/data";

type MediaNavDropdownProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

type DropdownPosition = {
  top: number;
  left: number;
  minWidth: number;
};

function isMediaActive(pathname: string) {
  return MEDIA_NAV_ITEMS.some((item) => pathname.startsWith(item.href));
}

export function MediaNavDropdown({ variant = "desktop", onNavigate }: MediaNavDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    minWidth: 240,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const active = isMediaActive(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (variant !== "desktop") return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || dropdownRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [variant]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (variant !== "desktop" || !open) return;

    function updatePosition() {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        minWidth: Math.max(rect.width, 240),
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, variant]);

  const dropdownLinks = MEDIA_NAV_ITEMS.map((item) => {
    const itemActive = pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        className={`block rounded-xl px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
          itemActive
            ? "bg-orange/10 text-white ring-1 ring-orange/25"
            : "text-muted hover:bg-white/[0.05] hover:text-orange"
        }`}
      >
        {item.label}
      </Link>
    );
  });

  if (variant === "mobile") {
    return (
      <div className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-media-menu"
          onClick={() => setOpen((value) => !value)}
          className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-widest transition-all ${
            active || open
              ? "border-l-2 border-orange bg-white/[0.04] text-white"
              : "border-l-2 border-transparent text-muted hover:border-orange/35 hover:bg-white/[0.03] hover:text-white"
          }`}
        >
          <span>Media</span>
          <span
            aria-hidden
            className={`text-xs text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-media-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="flex flex-col gap-1 px-2 py-2">{dropdownLinks}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const desktopDropdown =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              minWidth: dropdownPosition.minWidth,
            }}
            className="nav-media-dropdown-portal z-[90] pt-2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="nav-media-dropdown overflow-hidden rounded-2xl p-1.5">{dropdownLinks}</div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <div
      ref={containerRef}
      className="relative z-[1]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={`nav-link-hover group relative rounded-xl px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] ${
          active ? "text-white" : "text-muted"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/0 opacity-0 transition-all duration-300 group-hover:bg-white/[0.04] group-hover:opacity-100" />
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="nav-active-underline"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-1.5">
          Media
          <span
            aria-hidden
            className={`text-[9px] text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </span>
      </button>

      {desktopDropdown}
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LoadingScreen } from "./LoadingScreen";
import { LiquidGlassFilters } from "@/components/ui/LiquidGlassFilters";
import { ParticleField } from "@/components/ui/ParticleField";
import { AmbientGradients } from "@/components/ui/AmbientGradients";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return (
      <div className="relative min-h-screen page-bg">
        <main className="relative z-10">{children}</main>
      </div>
    );
  }

  return (
    <>
      <LiquidGlassFilters />
      <LoadingScreen />
      <div className="relative min-h-screen page-bg">
        <AmbientGradients />
        <ParticleField />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </div>
    </>
  );
}

"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LoadingScreen } from "./LoadingScreen";
import { LiquidGlassFilters } from "@/components/ui/LiquidGlassFilters";
import { ParticleField } from "@/components/ui/ParticleField";
import { AmbientGradients } from "@/components/ui/AmbientGradients";

export function SiteShell({ children }: { children: React.ReactNode }) {
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

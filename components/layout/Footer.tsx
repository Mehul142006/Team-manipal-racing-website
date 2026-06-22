import Link from "next/link";
import { FooterLocation } from "@/components/layout/FooterLocation";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { NAV_LINKS, SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="footer-orange-border relative bg-navy/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <TeamLogo variant="footer" />
              <div>
                <p className="font-semibold text-white">Team Manipal Racing Electric</p>
                <p className="text-xs text-muted">MIT Manipal</p>
              </div>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 block text-sm text-accent transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Navigation
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <FooterLocation />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-muted/70">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted/50">
            E-BAJA SAE India · Innovate · Initiate · Incarnate
          </p>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </footer>
  );
}

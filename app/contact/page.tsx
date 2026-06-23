import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { RecruitmentSection } from "@/components/contact/RecruitmentSection";
import { GoogleMapsLink } from "@/components/ui/GoogleMapsLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { SITE } from "@/lib/data";
import { getContactHeroImageUrl, getRecruitmentImageUrl } from "@/lib/get-contact-images";

export default function ContactPage() {
  const heroImageSrc = getContactHeroImageUrl();
  const recruitmentImageSrc = getRecruitmentImageUrl();

  return (
    <>
      <ContactHero heroImageSrc={heroImageSrc} />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Team information */}
            <div className="liquid-glass rounded-3xl p-8 sm:p-10 lg:col-span-1">
              <TeamLogo variant="footer" />
              <h3 className="mt-6 text-xl font-bold text-white">{SITE.name}</h3>
              <p className="mt-2 text-sm text-muted">Manipal Institute of Technology</p>
              <p className="text-sm text-muted">MAHE · Manipal, Karnataka</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">Location</p>
              <div className="mt-3 flex items-start gap-3">
                <address className="flex-1 space-y-1 text-sm not-italic text-muted">
                  {SITE.location.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
                <GoogleMapsLink href={SITE.location.googleMapsUrl} />
              </div>
            </div>

            {/* Contact + Captain */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <div className="liquid-glass flex-1 rounded-3xl p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-4 block text-lg font-semibold text-white transition-colors hover:text-accent"
                >
                  {SITE.email}
                </a>
                <p className="mt-6 text-xs text-muted">
                  For general inquiries, sponsorship, and team information.
                </p>
              </div>
              <div className="liquid-glass flex-1 rounded-3xl p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">Team Captain</p>
                <p className="mt-4 text-lg font-semibold text-white">{SITE.captain.name}</p>
                <a
                  href={`tel:${SITE.captain.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-mono text-sm text-accent transition-colors hover:text-white hover:orange-glow"
                >
                  {SITE.captain.phone}
                </a>
              </div>
            </div>

            {/* Social + Form */}
            <div className="liquid-glass rounded-3xl p-8 sm:p-10 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Social Media</p>
              <SocialLinks className="mt-4" />
              <div className="my-8 h-px bg-white/10" />
              <h3 className="text-lg font-bold text-white">Send a Message</h3>
              <p className="mt-2 text-sm text-muted">We&apos;ll respond as soon as possible.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <RecruitmentSection recruitmentImageSrc={recruitmentImageSrc} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Team Manipal Racing Electric | MIT Manipal",
    template: "%s | Team Manipal Racing Electric",
  },
  description:
    "Official E-BAJA SAE team of MAHE. Innovate. Initiate. Incarnate. Engineering high-performance electric off-road vehicles at MIT Manipal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-midnight text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

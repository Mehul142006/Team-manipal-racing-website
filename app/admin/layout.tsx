import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, readSessionToken } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = await readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            TMR Electric
          </Link>
          <p className="mt-2 text-2xl font-bold text-white">Admin</p>
        </div>
        {session && (
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Log out
            </button>
          </form>
        )}
      </header>
      {children}
    </div>
  );
}

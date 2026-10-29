import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/admin") && !params.next.startsWith("//") ? params.next : "/admin";

  return (
    <section className="mx-auto max-w-md">
      <div className="liquid-glass rounded-3xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Private</p>
        <h1 className="mt-3 text-2xl font-bold text-white">Administrator sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Contact submissions are available only to authorized administrators.
        </p>
        <div className="mt-6">
          <AdminLoginForm nextPath={nextPath} />
        </div>
      </div>
    </section>
  );
}

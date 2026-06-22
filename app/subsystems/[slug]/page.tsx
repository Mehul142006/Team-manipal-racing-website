import { redirect } from "next/navigation";
import { SUBSYSTEMS } from "@/lib/data";

export function generateStaticParams() {
  return SUBSYSTEMS.map((s) => ({ slug: s.slug }));
}

export default async function SubsystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = SUBSYSTEMS.some((sub) => sub.slug === slug);

  if (!exists) {
    redirect("/subsystems");
  }

  redirect(`/subsystems?open=${slug}`);
}

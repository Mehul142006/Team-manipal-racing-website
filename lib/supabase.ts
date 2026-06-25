import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const APPLICATIONS_TABLE = "applications";

function readEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY"): string {
  return (process.env[name] ?? "").trim();
}

/**
 * Supabase project URL only — must NOT include /rest/v1.
 * If /rest/v1 is included, supabase-js builds .../rest/v1/rest/v1/... (PGRST125).
 */
export function normalizeSupabaseUrl(rawUrl: string): string {
  let url = rawUrl.trim();
  if (!url) return "";

  url = url.replace(/^['"]|['"]$/g, "");
  url = url.replace(/\/+$/, "");
  url = url.replace(/\/rest\/v1\/?$/i, "");

  return url.replace(/\/+$/, "");
}

export function getSupabaseRestUrl(baseUrl: string): string {
  const normalized = normalizeSupabaseUrl(baseUrl);
  if (!normalized) return "";
  return `${normalized}/rest/v1`;
}

export function getSupabaseApplicationsInsertUrl(baseUrl: string): string {
  const restUrl = getSupabaseRestUrl(baseUrl);
  if (!restUrl) return "";
  return `${restUrl}/${APPLICATIONS_TABLE}`;
}

export function logSupabaseProductionConfig(context: string): void {
  const rawUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const rawKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const normalizedUrl = normalizeSupabaseUrl(rawUrl);

  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(`[supabase:${context}] NEXT_PUBLIC_SUPABASE_URL (raw):`, rawUrl || "(empty/undefined)");
  console.log(`[supabase:${context}] NEXT_PUBLIC_SUPABASE_URL (normalized):`, normalizedUrl || "(empty)");
  console.log(
    `[supabase:${context}] NEXT_PUBLIC_SUPABASE_ANON_KEY configured:`,
    Boolean(rawKey),
    rawKey ? `(length ${rawKey.length}, prefix ${rawKey.slice(0, 12)}…)` : "(empty/undefined)",
  );
  console.log(
    `[supabase:${context}] Expected REST insert URL:`,
    getSupabaseApplicationsInsertUrl(rawUrl) || "(none)",
  );

  if (!rawUrl || !rawKey) {
    console.error(
      `[supabase:${context}] Missing environment variables. NEXT_PUBLIC_* values are embedded at build time — set them in Vercel Project Settings → Environment Variables for Production, then trigger a new deployment.`,
    );
    return;
  }

  if (rawUrl !== normalizedUrl) {
    console.warn(
      `[supabase:${context}] Supabase URL was normalized. Use only the project URL in Vercel (https://<project-ref>.supabase.co) without /rest/v1.`,
      { rawUrl, normalizedUrl },
    );
  }
}

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  logSupabaseProductionConfig("createClient");

  const supabaseUrl = normalizeSupabaseUrl(readEnv("NEXT_PUBLIC_SUPABASE_URL"));
  const supabaseAnonKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    const message =
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel, then redeploy.";
    console.error("[supabase:createClient]", message);
    throw new Error(message);
  }

  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
    console.log("[supabase:createClient] Client initialized.", {
      restBaseUrl: getSupabaseRestUrl(supabaseUrl),
    });
  } catch (error) {
    console.error("[supabase:createClient] createClient(...) failed:", error);
    throw error;
  }

  return client;
}

export function assertSupabaseConfigured(): void {
  const rawUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const rawKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const normalizedUrl = normalizeSupabaseUrl(rawUrl);

  logSupabaseProductionConfig("assertSupabaseConfigured");

  if (!normalizedUrl || !rawKey) {
    const message =
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel, then redeploy.";
    console.error("[supabase:assertSupabaseConfigured]", message, {
      hasUrl: Boolean(rawUrl),
      hasKey: Boolean(rawKey),
    });
    throw new Error(message);
  }
}

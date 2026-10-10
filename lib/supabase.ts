import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const APPLICATIONS_TABLE = "applications";

/** Public project URL — safe fallback when env var is missing on Vercel. */
const FALLBACK_SUPABASE_URL = "https://xhisxyrklfahnzmwedyx.supabase.co";

function cleanEnvValue(value: string | undefined): string {
  return (value ?? "").trim().replace(/^['"]|['"]$/g, "");
}

/**
 * Supabase project URL only — must NOT include /rest/v1.
 * If /rest/v1 is included, requests hit .../rest/v1/rest/v1/... (PGRST125).
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

export type SupabaseServerConfig = {
  url: string;
  key: string;
  source: {
    url: "SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_URL" | "fallback" | "none";
    key: "SUPABASE_ANON_KEY" | "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "none";
  };
};

/** Server-side config — runtime SUPABASE_* vars preferred over build-time NEXT_PUBLIC_*. */
export function getSupabaseServerConfig(): SupabaseServerConfig {
  const urlFromServer = cleanEnvValue(process.env.SUPABASE_URL);
  const urlFromPublic = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const keyFromServer = cleanEnvValue(process.env.SUPABASE_ANON_KEY);
  const keyFromPublic = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  let urlSource: SupabaseServerConfig["source"]["url"] = "none";
  let rawUrl = "";

  if (urlFromServer) {
    rawUrl = urlFromServer;
    urlSource = "SUPABASE_URL";
  } else if (urlFromPublic) {
    rawUrl = urlFromPublic;
    urlSource = "NEXT_PUBLIC_SUPABASE_URL";
  } else {
    rawUrl = FALLBACK_SUPABASE_URL;
    urlSource = "fallback";
  }

  let keySource: SupabaseServerConfig["source"]["key"] = "none";
  let rawKey = "";

  if (keyFromServer) {
    rawKey = keyFromServer;
    keySource = "SUPABASE_ANON_KEY";
  } else if (keyFromPublic) {
    rawKey = keyFromPublic;
    keySource = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
  }

  return {
    url: normalizeSupabaseUrl(rawUrl),
    key: rawKey,
    source: { url: urlSource, key: keySource },
  };
}

export function createSupabaseServerClient(): SupabaseClient {
  const config = getSupabaseServerConfig();

  if (!config.url || !config.key) {
    console.error("[supabase:server] Missing Supabase anon key.", {
      urlSource: config.source.url,
      keySource: config.source.key,
    });
    throw new Error("Supabase is not configured on the server.");
  }

  return createClient(config.url, config.key);
}

export function logSupabaseServerConfig(context: string): void {
  const config = getSupabaseServerConfig();

  console.log(`[supabase:${context}] URL source:`, config.source.url);
  console.log(`[supabase:${context}] Key source:`, config.source.key);
  console.log(`[supabase:${context}] URL configured:`, Boolean(config.url));
  console.log(
    `[supabase:${context}] Key configured:`,
    Boolean(config.key),
    config.key ? `(length ${config.key.length}, prefix ${config.key.slice(0, 12)}…)` : "",
  );
  console.log(
    `[supabase:${context}] Expected REST insert URL:`,
    getSupabaseApplicationsInsertUrl(config.url) || "(none)",
  );
}

export type SupabaseInsertResult =
  | { ok: true }
  | { ok: false; status: number; message: string; code?: string; details?: string };

/** Direct REST insert — explicit URL avoids supabase-js path issues on Vercel. */
export async function insertApplicationRow(
  payload: Record<string, string>,
  config: SupabaseServerConfig = getSupabaseServerConfig(),
): Promise<SupabaseInsertResult> {
  if (!config.url || !config.key) {
    return {
      ok: false,
      status: 503,
      message: "Supabase is not configured on the server.",
    };
  }

  const insertUrl = getSupabaseApplicationsInsertUrl(config.url);

  console.log("[supabase:insert] POST", insertUrl);

  const response = await fetch(insertUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (response.ok) {
    return { ok: true };
  }

  const responseText = await response.text();
  let parsed: { message?: string; code?: string; details?: string } = {};

  try {
    parsed = JSON.parse(responseText) as typeof parsed;
  } catch {
    /* plain-text error body */
  }

  return {
    ok: false,
    status: response.status,
    message: parsed.message || responseText || response.statusText,
    code: parsed.code,
    details: parsed.details,
  };
}

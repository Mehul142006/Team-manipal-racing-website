export const ADMIN_COOKIE = "tmre_admin_session";
const SESSION_MS = 8 * 60 * 60 * 1000;

export type AdminSession = {
  username: string;
  expiresAt: number;
};

function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  if (secret.length < 32) return null;
  return secret;
}

export function isAdminAuthConfigured(): boolean {
  return sessionSecret() !== null;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

async function hmac(value: string): Promise<string> {
  const secret = sessionSecret();
  if (!secret) throw new Error("Admin session secret is not configured.");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function signaturesMatch(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

export async function createSessionToken(username: string): Promise<{ token: string; maxAge: number }> {
  const expiresAt = Date.now() + SESSION_MS;
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ u: username, exp: expiresAt })));
  const signature = await hmac(payload);
  return { token: `${payload}.${signature}`, maxAge: SESSION_MS / 1000 };
}

export async function readSessionToken(token: string | undefined | null): Promise<AdminSession | null> {
  if (!token || !sessionSecret()) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = await hmac(payload);
  if (!signaturesMatch(expected, signature)) return null;

  try {
    const parsed = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as {
      u?: unknown;
      exp?: unknown;
    };
    if (typeof parsed.u !== "string" || typeof parsed.exp !== "number") return null;
    if (parsed.exp < Date.now()) return null;
    return { username: parsed.u, expiresAt: parsed.exp };
  } catch {
    return null;
  }
}

export function adminCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

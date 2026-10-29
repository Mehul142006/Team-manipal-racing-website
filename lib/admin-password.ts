import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";

function scryptAsync(
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number },
) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, keylen, options, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey as Buffer);
    });
  });
}
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 32;

export type AdminCredential = {
  username: string;
  passwordHash: string;
};

export async function hashAdminPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = (await scryptAsync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  })) as Buffer;
  return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

export function getAdminCredentials(): AdminCredential[] {
  const raw = process.env.ADMIN_USERS?.trim() ?? "";
  if (!raw) return [];

  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .flatMap((entry) => {
      const separator = entry.indexOf(":");
      if (separator <= 0) return [];
      const username = entry.slice(0, separator).trim();
      const passwordHash = entry.slice(separator + 1).trim();
      if (!username || !passwordHash.startsWith("scrypt$")) return [];
      return [{ username, passwordHash }];
    });
}

async function verifyHash(password: string, stored: string): Promise<boolean> {
  const [algorithm, n, r, p, salt, expected] = stored.split("$");
  if (algorithm !== "scrypt" || !n || !r || !p || !salt || !expected) return false;

  const actual = (await scryptAsync(password, Buffer.from(salt, "base64url"), KEY_LENGTH, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  })) as Buffer;
  const expectedBytes = Buffer.from(expected, "base64url");
  if (actual.length !== expectedBytes.length) return false;
  return timingSafeEqual(actual, expectedBytes);
}

export async function authenticateAdmin(username: string, password: string): Promise<string | null> {
  const credentials = getAdminCredentials();
  const match = credentials.find((credential) => credential.username === username.trim());
  const hash =
    match?.passwordHash ??
    "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const valid = await verifyHash(password, hash);
  if (!match || !valid) return null;
  return match.username;
}

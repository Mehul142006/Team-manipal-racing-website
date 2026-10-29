import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const username = process.argv[2]?.trim();
const password = process.env.ADMIN_PASSWORD_INPUT ?? "";

if (!username || username.includes(":") || username.includes(",")) {
  console.error("Usage: ADMIN_PASSWORD_INPUT='your-password' node scripts/hash-admin-password.mjs username");
  process.exit(1);
}

if (password.length < 12) {
  console.error("Set ADMIN_PASSWORD_INPUT to a password of at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = await scryptAsync(password, salt, 32, { N: 16384, r: 8, p: 1 });
const encoded = `scrypt$16384$8$1$${salt.toString("base64url")}$${hash.toString("base64url")}`;

console.log(`${username}:${encoded}`);

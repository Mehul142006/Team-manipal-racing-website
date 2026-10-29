"use client";

import { useState } from "react";

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, next: nextPath }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; next?: string };
      if (!response.ok) {
        setError(result.error || "Unable to sign in.");
        return;
      }
      window.location.assign(result.next && result.next.startsWith("/admin") ? result.next : "/admin");
    } catch {
      setError("Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent">
          Username
        </span>
        <input
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange/45"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={12}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange/45"
        />
      </label>
      {error && <p className="text-sm text-orange">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full rounded-xl py-3.5 text-sm disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

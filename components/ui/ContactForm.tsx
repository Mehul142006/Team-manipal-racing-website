"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition-colors focus:border-orange/45";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setError(result.error || "Unable to send your message. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="liquid-glass rounded-2xl p-8 text-center"
      >
        <p className="text-accent">✓</p>
        <p className="mt-2 font-semibold text-white">Message Sent</p>
        <p className="mt-2 text-sm text-muted">We&apos;ll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="name"
          maxLength={120}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className={fieldClassName}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className={fieldClassName}
        />
      </div>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        maxLength={160}
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        required
        className={fieldClassName}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={5}
        maxLength={5000}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className={`${fieldClassName} resize-none`}
      />
      {error && <p className="text-sm text-orange">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full rounded-xl py-3.5 text-sm disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

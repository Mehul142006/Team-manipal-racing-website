"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
          placeholder="Name"
          required
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition-colors focus:border-orange/45"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition-colors focus:border-orange/45"
        />
      </div>
      <input
        type="text"
        placeholder="Subject"
        required
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition-colors focus:border-orange/45"
      />
      <textarea
        placeholder="Message"
        required
        rows={5}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition-colors focus:border-orange/45"
      />
      <button
        type="submit"
        className="btn-primary w-full rounded-xl py-3.5 text-sm sm:w-auto sm:px-10"
      >
        Send Message
      </button>
    </form>
  );
}

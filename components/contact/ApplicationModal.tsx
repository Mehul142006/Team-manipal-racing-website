"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  EMPTY_APPLICATION_FORM,
  RECRUITMENT_SUBSYSTEMS,
  WHATSAPP_VALIDATION_MESSAGE,
  isValidWhatsAppNumber,
  sanitizeWhatsAppNumber,
  toApplicationInsert,
  validateApplicationForm,
  type RecruitmentSubsystem,
} from "@/lib/recruitment";
import { ModalPortal } from "@/components/ui/ModalPortal";
import { assertSupabaseConfigured, supabase } from "@/lib/supabase";

type ApplicationModalProps = {
  open: boolean;
  onClose: () => void;
};

const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-orange/45";

const labelClassName = "mb-2 block text-xs font-semibold uppercase tracking-widest text-accent";

export function ApplicationModal({ open, onClose }: ApplicationModalProps) {
  const [form, setForm] = useState(EMPTY_APPLICATION_FORM);
  const [validationError, setValidationError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, submitting]);

  useEffect(() => {
    if (open) return;

    setForm(EMPTY_APPLICATION_FORM);
    setValidationError("");
    setSubmitError("");
    setSubmitting(false);
    setSuccess(false);
  }, [open]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setValidationError("");
    setSubmitError("");
  }

  function handleWhatsAppChange(rawValue: string) {
    updateField("whatsappNumber", sanitizeWhatsAppNumber(rawValue));
  }

  const whatsappDigits = form.whatsappNumber;
  const whatsappIsValid = isValidWhatsAppNumber(whatsappDigits);
  const realtimeWhatsappError =
    whatsappDigits.length > 0 && !whatsappIsValid ? WHATSAPP_VALIDATION_MESSAGE : null;
  const submitWhatsappError =
    validationError === WHATSAPP_VALIDATION_MESSAGE ||
    validationError === "WhatsApp Number is required."
      ? validationError
      : null;
  const showWhatsappError = realtimeWhatsappError || submitWhatsappError;
  const whatsappInputClassName = `${fieldClassName} ${
    showWhatsappError
      ? "border-red-500/80 focus:border-red-500"
      : whatsappIsValid
        ? "border-accent/45 pr-11 focus:border-accent/60"
        : ""
  }`;

  function handleClose() {
    if (submitting) return;
    onClose();
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setValidationError("");
    setSubmitError("");

    const validationMessage = validateApplicationForm(form);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setSubmitting(true);

    try {
      assertSupabaseConfigured();

      const { error } = await supabase.from("applications").insert(toApplicationInsert(form));

      if (error) {
        throw new Error(error.message || "Unable to submit application.");
      }

      setForm(EMPTY_APPLICATION_FORM);
      setSuccess(true);

      window.setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ModalPortal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl sm:p-6 clickable"
            onClick={handleClose}
          >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="application-modal relative flex max-h-[80vh] w-[min(80vw,42rem)] flex-col overflow-hidden rounded-3xl liquid-glass ring-1 ring-orange/15"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8 sm:py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                Recruitment
              </p>
              <h2 id="application-modal-title" className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Apply for Position
              </h2>
              <p className="mt-2 text-sm text-muted">
                Submit your details and preferred subsystems to join Team Manipal Racing Electric.
              </p>
            </div>

            {success ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
                <p className="text-2xl text-accent">✓</p>
                <p className="mt-4 text-lg font-semibold text-white">Application submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="application-name" className={labelClassName}>
                        Full Name
                      </label>
                      <input
                        id="application-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className={fieldClassName}
                        placeholder="Enter your full name"
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="application-registration" className={labelClassName}>
                        Registration Number
                      </label>
                      <input
                        id="application-registration"
                        type="text"
                        required
                        value={form.registrationNumber}
                        onChange={(event) => updateField("registrationNumber", event.target.value)}
                        className={fieldClassName}
                        placeholder="Enter your registration number"
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="application-whatsapp" className={labelClassName}>
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <input
                          id="application-whatsapp"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          required
                          value={form.whatsappNumber}
                          onChange={(event) => handleWhatsAppChange(event.target.value)}
                          className={whatsappInputClassName}
                          placeholder="Enter your WhatsApp number"
                          disabled={submitting}
                          aria-invalid={showWhatsappError ? true : undefined}
                          aria-describedby={showWhatsappError ? "application-whatsapp-error" : undefined}
                        />
                        {whatsappIsValid && (
                          <span
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-accent"
                            aria-hidden
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      {showWhatsappError && (
                        <p id="application-whatsapp-error" className="mt-2 text-sm text-orange">
                          {showWhatsappError}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="application-preference-1" className={labelClassName}>
                          Preference 1
                        </label>
                        <select
                          id="application-preference-1"
                          required
                          value={form.preference1}
                          onChange={(event) =>
                            updateField("preference1", event.target.value as RecruitmentSubsystem)
                          }
                          className={`${fieldClassName} appearance-none`}
                          disabled={submitting}
                        >
                          <option value="" disabled>
                            Select subsystem
                          </option>
                          {RECRUITMENT_SUBSYSTEMS.map((option) => (
                            <option key={option} value={option} className="bg-midnight text-white">
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="application-preference-2" className={labelClassName}>
                          Preference 2
                        </label>
                        <select
                          id="application-preference-2"
                          required
                          value={form.preference2}
                          onChange={(event) =>
                            updateField("preference2", event.target.value as RecruitmentSubsystem)
                          }
                          className={`${fieldClassName} appearance-none`}
                          disabled={submitting}
                        >
                          <option value="" disabled>
                            Select subsystem
                          </option>
                          {RECRUITMENT_SUBSYSTEMS.map((option) => (
                            <option key={option} value={option} className="bg-midnight text-white">
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {validationError &&
                      validationError !== WHATSAPP_VALIDATION_MESSAGE &&
                      validationError !== "WhatsApp Number is required." && (
                        <p className="text-sm text-orange">{validationError}</p>
                      )}
                    {submitError && <p className="text-sm text-orange">{submitError}</p>}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="liquid-glass liquid-glass-btn rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary rounded-xl px-6 py-3 text-sm disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

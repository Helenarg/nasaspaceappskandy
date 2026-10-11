"use client";
import { useRef, useState } from "react";
import { submitForm, type FormKind } from "./submissions";
import type { Errors } from "./validation";

type Options = {
  kind: FormKind;
  validate: () => Errors<string>;
  build: () => Record<string, unknown>;
};
export function useFormSubmit({ kind, validate, build }: Options) {
  const [errors, setErrors] = useState<Errors<string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [trap, setTrap] = useState("");
  const inFlight = useRef(false);
  function clearError(field: string) {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }
  async function submit() {
    if (inFlight.current) return;
    const found = validate();
    setErrors(found);
    const invalid = Object.keys(found).find((key) => found[key]);
    if (invalid) {
      setFormError("Please fix the highlighted fields.");
      document.getElementById(`field-${invalid}`)?.focus();
      return;
    }
    if (trap.trim()) {
      setFormError(
        "Your submission could not be processed. Please contact the Kandy team.",
      );
      return;
    }
    inFlight.current = true;
    setSubmitting(true);
    setFormError(null);
    try {
      const result = await submitForm(kind, build());
      if (result.ok) setReceipt(result.id);
      else setFormError(result.message);
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }
  function reset() {
    setReceipt(null);
    setErrors({});
    setFormError(null);
    setTrap("");
  }
  return {
    errors,
    clearError,
    submitting,
    receipt,
    formError,
    submit,
    reset,
    trap,
    setTrap,
  };
}

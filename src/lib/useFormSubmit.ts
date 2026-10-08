import { useCallback, useEffect, useRef, useState } from 'react';
import { submitForm, type FormKind } from './submissions';
import type { Errors } from './validation';

type Options<F extends string> = {
  kind: FormKind;
  /** Return a message per invalid field. Empty object means valid. */
  validate: () => Errors<F>;
  /** Shape written to Firestore. Only called once validation passes. */
  build: () => Record<string, unknown>;
};

/**
 * Validation + submit state for one form: inline per-field errors, a single
 * in-flight guard against double submits, and a bot trap.
 */
export function useFormSubmit<F extends string>({ kind, validate, build }: Options<F>) {
  const [errors, setErrors] = useState<Errors<F>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Honeypot: a field no human sees. Bots fill everything.
  const [trap, setTrap] = useState('');
  const mountedAt = useRef(0);
  useEffect(() => { mountedAt.current = Date.now(); }, []);

  const clearError = useCallback((field: F) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const submit = useCallback(async () => {
    if (submitting) return;

    const found = validate();
    const firstInvalid = (Object.keys(found) as F[]).find((k) => found[k]);
    setErrors(found);
    if (firstInvalid) {
      setFormError('Please fix the highlighted fields.');
      return;
    }

    // Silently accept-and-drop obvious bots rather than telling them why they failed.
    if (trap.trim() || Date.now() - mountedAt.current < 2000) {
      setSubmitted(true);
      return;
    }

    setFormError(null);
    setSubmitting(true);
    const result = await submitForm(kind, build());
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setFormError(result.message);
    }
  }, [submitting, validate, build, trap, kind]);

  const reset = useCallback(() => {
    setSubmitted(false);
    setErrors({});
    setFormError(null);
    mountedAt.current = Date.now();
  }, []);

  return { errors, clearError, submitting, submitted, formError, submit, reset, trap, setTrap };
}

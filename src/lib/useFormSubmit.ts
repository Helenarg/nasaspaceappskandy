import { useCallback, useRef, useState } from 'react';
import { createSubmission, waitForReceipt, type FormKind } from './submissions';
import { submissionsReady, readinessMessage } from './firebase';
import type { Errors } from './validation';
type Options<F extends string> = { kind: FormKind; validate: () => Errors<F>; build: () => Record<string, unknown> };
export function useFormSubmit<F extends string>({ kind, validate, build }: Options<F>) {
  const [errors, setErrors] = useState<Errors<F>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attemptLocked, setAttemptLocked] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [trap, setTrap] = useState('');
  const inFlight = useRef(false);
  const attempt = useRef<ReturnType<typeof createSubmission> | null>(null);
  const clearError = useCallback((field: F) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);
  const submit = useCallback(async () => {
    if (inFlight.current || submitted) return;
    if (!attempt.current) {
      const found = validate();
      setErrors(found);
      if (Object.values(found).some(Boolean)) {
        setFormError('Please fix the highlighted fields.');
        return;
      }
      if (!submissionsReady()) { setFormError(readinessMessage); return; }
      if (trap.trim()) { setFormError('We could not submit this form. Please refresh and try again.'); return; }
      attempt.current = createSubmission(kind, build());
      setAttemptLocked(true);
    }
    inFlight.current = true;
    setFormError(null);
    setSubmitting(true);
    try {
      const result = await waitForReceipt(attempt.current.send());
      if (result.ok) setSubmitted(true);
      else setFormError(result.message);
    } finally { inFlight.current = false; setSubmitting(false); }
  }, [submitted, validate, build, trap, kind]);
  const reset = useCallback(() => {
    if (inFlight.current) return;
    attempt.current = null;
    setAttemptLocked(false);
    setSubmitted(false); setErrors({}); setFormError(null); setTrap('');
  }, []);
  return { errors, clearError, submitting, submitted, attemptLocked, formError, submit, reset, trap, setTrap };
}

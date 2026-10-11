export type Errors<T extends string> = Partial<Record<T, string>>;

// Deliberately permissive: one @, a dot in the domain, no spaces. Anything stricter
// rejects valid addresses, and the real check is the confirmation email.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

/** Sri Lankan mobile/landline, with or without +94 and separators. Empty passes: use required() for that. */
export function isPhone(value: string) {
  const digits = value.replace(/[\s()+-]/g, "");
  if (!digits) return true;
  return /^(?:94\d{9}|0\d{9}|\d{9})$/.test(digits);
}

export function required(value: string) {
  return value.trim().length > 0;
}

export function tooLong(value: string, max: number) {
  return value.trim().length > max;
}

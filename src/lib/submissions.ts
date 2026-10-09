import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import { Platform } from 'react-native';
import { db } from './firebase';
export type FormKind = 'registrations' | 'volunteers' | 'ambassadors' | 'messages';
export type SubmitResult = { ok: true; id: string } | { ok: false; message: string };
/** Stable create-only identity across retries. No public reads or updates. */
export function createSubmission(kind: FormKind, data: Record<string, unknown>) {
  const ref = doc(collection(db, kind));
  const payload = { ...data, createdAt: serverTimestamp(), source: Platform.OS, appVersion: '1.0.0', status: 'new' };
  let pending: Promise<SubmitResult> | null = null;
  let saved: SubmitResult | null = null;
  return {
    send(): Promise<SubmitResult> {
      if (saved?.ok) return Promise.resolve(saved);
      if (pending) return pending;
      pending = setDoc(ref, payload).then(() => {
        saved = { ok: true, id: ref.id };
        return saved;
      }).catch((error: unknown): SubmitResult => {
        const code = (error as { code?: string })?.code;
        return { ok: false, message: code === 'unavailable'
          ? 'No connection to the server. Check your network and try again.'
          : 'We could not confirm receipt. Retry repeats the original attempt. This app cannot read saved records to check receipt. Contact the organisers before sending a new response or reloading.' };
      }).finally(() => { pending = null; });
      return pending;
    },
  };
}
/** Timeout never cancels the write; the attempt retains its pending promise. */
export async function waitForReceipt(pending: Promise<SubmitResult>, timeout = 12000): Promise<SubmitResult> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([pending, new Promise<SubmitResult>((resolve) => {
      timer = setTimeout(() => resolve({ ok: false, message: 'Receipt is not confirmed yet. Check your connection and retry the same submission. Do not send another response or reload while receipt is uncertain.' }), timeout);
    })]);
  } finally { if (timer) clearTimeout(timer); }
}

import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import { Platform } from 'react-native';
import { db } from './firebase';

export type FormKind = 'registrations' | 'volunteers' | 'ambassadors' | 'messages';

export type SubmitResult = { ok: true; id: string } | { ok: false; message: string };

/** Fields every submission carries, so organisers can triage without asking the dev. */
function envelope() {
  return {
    createdAt: serverTimestamp(),
    source: Platform.OS,
    // Set by the form; lets organisers spot a broken release without digging.
    appVersion: '1.0.0',
    status: 'new',
  };
}

const SUBMIT_TIMEOUT_MS = 12000;

/** The Firestore SDK queues writes offline and never settles addDoc, so cap the wait. */
function withTimeout<T>(p: Promise<T>): Promise<T | 'timeout'> {
  return Promise.race([p, new Promise<'timeout'>((r) => setTimeout(() => r('timeout'), SUBMIT_TIMEOUT_MS))]);
}

/**
 * Writes one submission. Rejected writes (rules, App Check, offline) surface as a
 * message the form shows inline — never a silent success.
 */
export async function submitForm(
  kind: FormKind,
  data: Record<string, unknown>
): Promise<SubmitResult> {
  try {
    const ref = await withTimeout(addDoc(collection(db, kind), { ...data, ...envelope() }));
    if (ref === 'timeout') {
      return {
        ok: false,
        message:
          'The server is not responding. Please check your connection and try again, or email info@nasaspaceapps.lk.',
      };
    }
    return { ok: true, id: ref.id };
  } catch (e: any) {
    const code = e?.code ?? '';
    if (code === 'permission-denied') {
      return {
        ok: false,
        message:
          'We could not save that. Please try again in a moment, or email info@nasaspaceapps.lk.',
      };
    }
    if (code === 'unavailable') {
      return { ok: false, message: 'No connection to the server. Check your network and try again.' };
    }
    return { ok: false, message: 'Something went wrong. Please try again, or email info@nasaspaceapps.lk.' };
  }
}

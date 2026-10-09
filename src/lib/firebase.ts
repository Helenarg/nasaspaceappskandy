import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { Platform } from 'react-native';
// Lite SDK: REST writes only. ~60% smaller than the full Firestore client and it
// fails fast instead of silently queueing writes offline, which a form needs.
import { getFirestore } from 'firebase/firestore/lite';

// Firebase web config is public by design; what protects the data is the Firestore
// security rules (see firestore.rules) plus App Check, not the secrecy of these values.
const firebaseConfig = {
  apiKey: 'AIzaSyCDNermrKPac26P_S0OYv4yu8YqwHlN9J0',
  authDomain: 'nasaspaceappskandy.firebaseapp.com',
  projectId: 'nasaspaceappskandy',
  storageBucket: 'nasaspaceappskandy.firebasestorage.app',
  messagingSenderId: '1001988000034',
  appId: '1:1001988000034:web:401c6c589fd4738c0ffd7b',
  measurementId: 'G-BZF5PJG861',
};

export const app = initializeApp(firebaseConfig);
const siteKey = process.env.EXPO_PUBLIC_RECAPTCHA_SITE_KEY;
// Attestation is initialized before Firestore requests. No debug tokens in releases.
if (Platform.OS === 'web' && typeof window !== 'undefined' && siteKey) {
  initializeAppCheck(app, { provider: new ReCaptchaV3Provider(siteKey), isTokenAutoRefreshEnabled: true });
}
export const db = getFirestore(app);

// Analytics is web-only; calling it on native without the native SDK throws.
// Analytics stays off: no implicit tracking while the organizer policy is pending.
export const analytics = null;

export function submissionsReady() {
  return Platform.OS === 'web' && !!siteKey && process.env.EXPO_PUBLIC_ENABLE_LOCAL_FORMS === 'true';
}

export const readinessMessage = 'Local applications are not open yet. Use the official Space Apps website to register for the global event.';

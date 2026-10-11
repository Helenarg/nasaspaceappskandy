import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { hasFunctionalConsent } from "@/lib/cookie-consent";

// Public web configuration from the existing Kandy project. Access is controlled
// by firestore.rules and App Check, never by hiding these identifiers.
const firebaseConfig = {
  apiKey: "AIzaSyCDNermrKPac26P_S0OYv4yu8YqwHlN9J0",
  authDomain: "nasaspaceappskandy.firebaseapp.com",
  projectId: "nasaspaceappskandy",
  storageBucket: "nasaspaceappskandy.firebasestorage.app",
  messagingSenderId: "1001988000034",
  appId: "1:1001988000034:web:401c6c589fd4738c0ffd7b",
};
let appCheckReady = false;
export function getSubmissionDatabase() {
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (
    typeof window !== "undefined" &&
    siteKey &&
    hasFunctionalConsent() &&
    !appCheckReady
  ) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
    appCheckReady = true;
  }
  return getFirestore(app);
}

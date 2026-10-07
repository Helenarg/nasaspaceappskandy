import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDNermrKPac26P_S0OYv4yu8YqwHlN9J0",
  authDomain: "nasaspaceappskandy.firebaseapp.com",
  projectId: "nasaspaceappskandy",
  storageBucket: "nasaspaceappskandy.firebasestorage.app",
  messagingSenderId: "1001988000034",
  appId: "1:1001988000034:web:401c6c589fd4738c0ffd7b",
  measurementId: "G-BZF5PJG861"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (it is only supported in web environments, which avoids crashes in React Native without specialized native setup)
export let analytics: any = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

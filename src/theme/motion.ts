import { useSyncExternalStore } from 'react';
import { AccessibilityInfo, AppState, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// react-native-web has no native animated module: passing true only logs a warning.
export const USE_NATIVE_DRIVER = Platform.OS !== 'web';

const STORAGE_KEY = 'space-apps-motion-paused';
const listeners = new Set<() => void>();
let osReduced = false;
let userPaused = false;
let preferenceRevision = 0;
let appSuspended = false;
let initialized = false;
let cleanup: (() => void) | undefined;
function emit() {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.documentElement.dataset.motionPaused = String(osReduced || userPaused || appSuspended);
  }
  listeners.forEach(listener => listener());
}

// One OS listener serves every effect; an explicit user choice also stops loops.
function initialize() {
  if (initialized) return;
  initialized = true;
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try { userPaused = window.localStorage.getItem(STORAGE_KEY) === 'true'; } catch { /* Storage can be disabled. */ }
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    osReduced = query.matches;
    appSuspended = document.visibilityState === 'hidden';
    document.documentElement.dataset.motionPaused = String(osReduced || userPaused || appSuspended);
    const onChange = () => { osReduced = query.matches; emit(); };
    const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY) { userPaused = event.newValue === 'true'; emit(); } };
    query.addEventListener('change', onChange);
    window.addEventListener('storage', onStorage);
    const onVisibility = () => { appSuspended = document.visibilityState === 'hidden'; emit(); };
    document.addEventListener('visibilitychange', onVisibility);
    cleanup = () => { query.removeEventListener('change', onChange); window.removeEventListener('storage', onStorage); document.removeEventListener('visibilitychange', onVisibility); };
  } else {
    let alive = true;
    const revision = preferenceRevision;
    SecureStore.getItemAsync(STORAGE_KEY).then(value => { if (alive && revision === preferenceRevision) { userPaused = value === 'true'; emit(); } }).catch(() => {});
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (alive) { osReduced = value; emit(); } }).catch(() => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', value => { osReduced = value; emit(); });
    appSuspended = AppState.currentState !== null && AppState.currentState !== 'active';
    const stateSubscription = AppState.addEventListener('change', value => { appSuspended = value !== 'active'; emit(); });
    cleanup = () => { alive = false; subscription.remove(); stateSubscription.remove(); };
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  initialize();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) { cleanup?.(); cleanup = undefined; initialized = false; }
  };
}
export function setMotionPaused(paused: boolean) {
  preferenceRevision++;
  userPaused = paused;
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try { window.localStorage.setItem(STORAGE_KEY, String(paused)); } catch { /* Session choice still works. */ }
  }
  if (Platform.OS !== 'web') void SecureStore.setItemAsync(STORAGE_KEY, String(paused)).catch(() => {});
  emit();
}
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, () => userPaused, () => false);
}
/** OS preferences always take precedence, including when the user resumes motion. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => osReduced || userPaused || appSuspended, () => false);
}

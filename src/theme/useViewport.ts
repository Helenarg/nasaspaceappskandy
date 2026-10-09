import { useSyncExternalStore } from 'react';
import { Dimensions } from 'react-native';

// Match static HTML during hydration; actual device dimensions follow immediately.
const SERVER_DIMENSIONS = { width: 0, height: 0, scale: 1, fontScale: 1 };
const serverSnapshot = () => SERVER_DIMENSIONS;
const clientSnapshot = () => Dimensions.get('window');
const listeners = new Set<() => void>();
let subscription: ReturnType<typeof Dimensions.addEventListener> | undefined;
function subscribe(onChange: () => void) {
  listeners.add(onChange);
  subscription ??= Dimensions.addEventListener('change', () => listeners.forEach(listener => listener()));
  return () => {
    listeners.delete(onChange);
    if (!listeners.size) { subscription?.remove(); subscription = undefined; }
  };
}

export function useViewport() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

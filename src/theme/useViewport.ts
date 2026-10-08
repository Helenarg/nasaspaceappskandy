import { useSyncExternalStore } from 'react';
import { Dimensions } from 'react-native';

// Match static HTML during hydration; actual device dimensions follow immediately.
const SERVER_DIMENSIONS = { width: 0, height: 0, scale: 1, fontScale: 1 };
const serverSnapshot = () => SERVER_DIMENSIONS;
const clientSnapshot = () => Dimensions.get('window');
function subscribe(onChange: () => void) {
  const subscription = Dimensions.addEventListener('change', onChange);
  return () => subscription.remove();
}

export function useViewport() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

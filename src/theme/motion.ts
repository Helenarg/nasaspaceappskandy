import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

// react-native-web has no native animated module: passing true only logs a warning.
export const USE_NATIVE_DRIVER = Platform.OS !== 'web';

/** True when the OS/browser asks for reduced motion. Looping decorations should opt out. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => mounted && setReduced(v));
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  return reduced;
}

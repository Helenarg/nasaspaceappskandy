import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

/** Mounted native stack screens must stop decorative work after losing focus. */
export function useRouteActive() {
  const [active, setActive] = useState(false);
  useFocusEffect(useCallback(() => {
    setActive(true);
    return () => setActive(false);
  }, []));
  return active;
}

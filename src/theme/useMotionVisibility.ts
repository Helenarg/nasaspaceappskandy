import { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';

/** Pause decorative loops when their section is outside the scroll viewport. */
export function useMotionVisibility() {
  const ref = useRef<View>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const element = ref.current as unknown as HTMLElement | null;
    if (Platform.OS !== 'web' || !element?.getBoundingClientRect || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

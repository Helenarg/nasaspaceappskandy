import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { USE_NATIVE_DRIVER, useReducedMotion } from '../theme/motion';

/** Static HTML remains visible. One-shot motion is progressive enhancement. */
export default function Reveal({ children, style, delay = 0, distance = 42, duration = 900, testID, masked = false }: {
  children: React.ReactNode; style?: StyleProp<ViewStyle>; delay?: number; distance?: number; duration?: number; testID?: string; masked?: boolean;
}) {
  const node = useRef<View>(null);
  const [progress] = useState(() => new Animated.Value(1));
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { progress.setValue(1); return; }
    let animation: Animated.CompositeAnimation | undefined;
    const enter = () => {
      animation = Animated.timing(progress, { toValue: 1, duration, delay,
        easing: Easing.out(Easing.cubic), useNativeDriver: USE_NATIVE_DRIVER });
      animation.start();
    };
    const child = node.current as unknown as HTMLElement | null;
    // Observe the untransformed mask: a translated short line can be fully clipped.
    const element = masked && Platform.OS === 'web' ? child?.parentElement : child;
    if (Platform.OS === 'web' && typeof IntersectionObserver !== 'undefined' && element?.getBoundingClientRect) {
      progress.setValue(0);
      const observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) { enter(); observer.disconnect(); }
      }, { threshold: 0.05 });
      observer.observe(element);
      return () => { observer.disconnect(); animation?.stop(); progress.setValue(1); };
    }
    progress.setValue(0);
    enter();
    return () => { animation?.stop(); progress.setValue(1); };
  }, [delay, distance, duration, masked, progress, reduced]);
  return <Animated.View testID={testID} ref={node} style={[style, { opacity: progress,
    transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }] }]}>
    {children}
  </Animated.View>;
}

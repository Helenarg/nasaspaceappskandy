import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, Platform, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { USE_NATIVE_DRIVER, useReducedMotion } from '../theme/motion';
import { useRouteActive } from '../theme/useRouteActive';

/** Cinematic image drift plus a small scroll parallax; animation pauses offscreen. */
export default function SpaceScene({ source, children, style }: {
  source: ImageSourcePropType; children: React.ReactNode; style?: StyleProp<ViewStyle>;
}) {
  const node = useRef<View>(null);
  const [drift] = useState(() => new Animated.Value(0));
  const [scroll] = useState(() => new Animated.Value(0));
  const reduced = useReducedMotion();
  const active = useRouteActive();
  useEffect(() => {
    if (!active) return;
    if (reduced) { drift.setValue(0); scroll.setValue(0); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(drift, { toValue: 1, duration: 16000, easing: Easing.inOut(Easing.sin), useNativeDriver: USE_NATIVE_DRIVER }),
      Animated.timing(drift, { toValue: 0, duration: 16000, easing: Easing.inOut(Easing.sin), useNativeDriver: USE_NATIVE_DRIVER }),
    ]));
    const element = node.current as unknown as HTMLElement | null;
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let visible = false;
    let scroller: HTMLElement | null = null;
    const update = () => {
      frame = 0;
      if (visible && element) {
        const rect = element.getBoundingClientRect();
        scroll.setValue(Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight)));
      }
    };
    const onScroll = () => { if (visible && !frame) frame = window.requestAnimationFrame(update); };
    if (Platform.OS === 'web' && element?.getBoundingClientRect && typeof IntersectionObserver !== 'undefined') {
      scroller = element.parentElement;
      while (scroller && !/auto|scroll/.test(getComputedStyle(scroller).overflowY)) scroller = scroller.parentElement;
      scroller?.addEventListener('scroll', onScroll, { passive: true });
      observer = new IntersectionObserver(entries => {
        const nextVisible = entries.some(entry => entry.isIntersecting);
        if (nextVisible === visible) return;
        visible = nextVisible;
        if (visible) { loop.reset(); loop.start(); onScroll(); } else loop.stop();
      });
      observer.observe(element);
    } else loop.start();
    return () => { loop.stop(); observer?.disconnect(); scroller?.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [drift, scroll, reduced, active]);
  return <View ref={node} style={[{ overflow: 'hidden' }, style]}>
    <Animated.Image source={source} resizeMode="cover" accessibilityElementsHidden aria-hidden
      style={[styles.image, { transform: [{ scale: drift.interpolate({ inputRange: [0, 1], outputRange: [1.1, 1.17] }) },
        { translateY: scroll.interpolate({ inputRange: [-1, 1], outputRange: [-26, 26] }) }] }]} />
    {children}
  </View>;
}
const styles = StyleSheet.create({ image: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' } });

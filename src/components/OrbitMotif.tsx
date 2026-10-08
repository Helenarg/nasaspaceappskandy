import React, { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Ellipse, Line } from 'react-native-svg';
import { useReducedMotion, USE_NATIVE_DRIVER } from '../theme/motion';
import { useViewport } from '../theme/useViewport';
import { useMotionVisibility } from '../theme/useMotionVisibility';

export default function OrbitMotif() {
  const [rotation] = useState(() => new Animated.Value(0));
  const reduced = useReducedMotion();
  const { ref, visible } = useMotionVisibility();
  const { width } = useViewport();
  useEffect(() => {
    if (reduced || !visible) return;
    const loop = Animated.loop(Animated.timing(rotation, { toValue: 1, duration: 70000, easing: Easing.linear, useNativeDriver: USE_NATIVE_DRIVER }));
    loop.start();
    return () => loop.stop();
  }, [reduced, rotation, visible]);
  return <View ref={ref} aria-hidden accessibilityElementsHidden style={{ pointerEvents: 'none', position: 'absolute', right: width < 900 ? -100 : 0,
    top: 30, width: width < 900 ? 250 : 440, height: width < 900 ? 250 : 440, opacity: 0.22 }}>
    <Animated.View style={{ width: '100%', height: '100%', transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
      <Svg viewBox="0 0 320 320" width="100%" height="100%">
        <Circle cx="160" cy="160" r="110" stroke="#2E96F5" strokeWidth="1" fill="none" strokeDasharray="2 12" />
        <Circle cx="160" cy="160" r="145" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        <Ellipse cx="160" cy="160" rx="148" ry="65" stroke="#2E96F5" strokeWidth="1" fill="none" rotation="-35" origin="160,160" />
        <Line x1="135" y1="160" x2="185" y2="160" stroke="#FFFFFF" /><Line x1="160" y1="135" x2="160" y2="185" stroke="#FFFFFF" />
        <Circle cx="160" cy="15" r="5" fill="#EAFE07" /><Circle cx="50" cy="160" r="3" fill="#FFFFFF" />
      </Svg>
    </Animated.View>
  </View>;
}

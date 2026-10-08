import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Design system calls for 12-16px blur; 16 reads better on large surfaces. */
  intensity?: number;
  /** Cyan edge instead of the neutral white edge. */
  accent?: boolean;
};

/**
 * The glassmorphism surface from the design system. BlurView gives real backdrop blur
 * on iOS, Android and web; a plain View would only be a flat translucent fill.
 */
export default function GlassCard({ children, style, intensity = 14, accent = false }: Props) {
  return (
    <BlurView
      intensity={intensity}
      tint="dark"
      style={[styles.card, accent && styles.accent, style]}
    >
      <View style={styles.tintLayer} />
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.37)',
  },
  accent: {
    borderColor: colors.borderCyan,
  },
  // BlurView alone is too light on a dark page; this holds the navy cast.
  tintLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 15, 31, 0.55)',
  },
});

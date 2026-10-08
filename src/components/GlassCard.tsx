import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Kept for callers migrating from the previous blurred card. */
  intensity?: number;
  /** Yellow accent edge instead of the neutral white edge. */
  accent?: boolean;
};

/**
 * A clean, opaque branded surface keeps contrast predictable on every platform.
 */
export default function GlassCard({ children, style, accent = false }: Props) {
  return (
    <View
      style={[styles.card, accent && styles.accent, style]}
    >
      <View style={styles.tintLayer} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accent: {
    borderColor: colors.borderCyan,
  },
  // A subtle blue tint keeps the surface consistent with the page palette.
  tintLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 66, 166, 0.08)',
  },
});

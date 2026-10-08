import React from 'react';
import { Image, StyleSheet } from 'react-native';

// The supplied mark is intact: no recoloring, stretching, effects or overlays.
export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <Image source={require('../../assets/brand/space-apps-logo.png')} resizeMode="contain"
    accessibilityLabel="NASA Space Apps Challenge" style={[styles.logo, compact && styles.compact]} />;
}
const styles = StyleSheet.create({
  logo: { width: 168, height: 72 },
  compact: { width: 130, height: 58 },
});

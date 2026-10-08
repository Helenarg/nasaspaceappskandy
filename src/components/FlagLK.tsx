import React from 'react';
import { Image, StyleSheet, type ImageStyle, type StyleProp } from 'react-native';

type Props = { width?: number; style?: StyleProp<ImageStyle> };

/**
 * The 🇱🇰 emoji has no glyph on Windows Chrome and most Android browsers, where it
 * renders as the letters "LK". This ships the actual flag instead.
 */
export default function FlagLK({ width = 20, style }: Props) {
  return (
    <Image
      source={require('../../assets/flag-lk.png')}
      style={[{ width, height: width / 2 }, styles.flag, style]}
      accessibilityLabel="Flag of Sri Lanka"
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  flag: {
    borderRadius: 2,
  },
});

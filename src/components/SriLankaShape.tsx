import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function SriLankaShape() {
  return <View style={styles.shape} />;
}

const styles = StyleSheet.create({
  shape: {
    width: 250,
    height: 380,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    transform: [{ rotate: '10deg' }]
  }
});

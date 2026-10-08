import React from 'react';
import { Link, type Href } from 'expo-router';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from './LocalizedText';
import { ArrowRight } from './icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export default function ActionLink({ href, label, secondary = false }: { href: Href; label: string; secondary?: boolean }) {
  return <Link href={href} asChild>
    <Pressable accessibilityRole="link" testID={secondary ? 'action-secondary' : 'action-primary'} style={StyleSheet.flatten([styles.button, secondary && styles.secondary])}>
      <Text style={[styles.label, secondary && styles.secondaryLabel]}>{label}</Text>
      <View testID="action-arrow"><ArrowRight size={18} color={secondary ? colors.text : colors.ink} /></View>
    </Pressable>
  </Link>;
}
const styles = StyleSheet.create({
  button: { minHeight: 54, paddingHorizontal: 24, paddingVertical: 16, backgroundColor: colors.primary,
    borderWidth: 1, borderColor: colors.primary, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 },
  secondary: { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.4)' },
  label: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1, color: colors.ink, flexShrink: 1 },
  secondaryLabel: { color: colors.text },
});

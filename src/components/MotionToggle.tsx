import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Text } from './LocalizedText';
import { setMotionPaused, useMotionPaused } from '../theme/motion';
import { useI18n } from '../i18n';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export default function MotionToggle() {
  const paused = useMotionPaused();
  const { lang } = useI18n();
  const label = lang === 'si' ? (paused ? 'චලන නැවත ආරම්භ කරන්න' : 'චලන නවත්වන්න')
    : lang === 'ta' ? (paused ? 'அசைவுகளை மீண்டும் தொடங்கவும்' : 'அசைவுகளை நிறுத்தவும்')
      : (paused ? 'Resume animations' : 'Pause animations');
  return <Pressable accessibilityRole="button" accessibilityLabel={label}
    accessibilityState={{ selected: paused }} {...(Platform.OS === 'web' ? { 'aria-pressed': paused } : {})}
    onPress={() => setMotionPaused(!paused)} style={styles.control}><Text style={styles.label}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({
  control: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.textMuted, borderRadius: 4, alignSelf: 'flex-start' },
  label: { color: colors.text, fontFamily: fonts.bodyBold, fontSize: 14 },
});

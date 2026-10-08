import { useViewport } from '../theme/useViewport';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './LocalizedText';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import Reveal from './Reveal';

const STATS = [
  { value: '48', unit: 'HOURS', text: 'To turn a bold idea into something real.' },
  { value: '09', unit: 'PROVINCES', text: 'One island. A shared spirit of discovery.' },
  { value: '01', unit: 'PLANET', text: 'Open data. Real challenges. Global impact.' },
];
export default function StatsSection() {
  const { width } = useViewport();
  return <View style={styles.shell}><Reveal style={[layout.container(width), styles.grid]}>
    {STATS.map((stat, index) => <View key={stat.unit} style={[styles.cell, { width: width < 700 ? '100%' : '33.333%' },
      index < 2 && (width < 700 ? styles.bottomBorder : styles.rightBorder)]}>
      <View style={styles.valueRow}><Text style={styles.value}>{stat.value}</Text><Text style={styles.unit}>{stat.unit}</Text></View>
      <Text style={styles.text}>{stat.text}</Text>
    </View>)}
  </Reveal></View>;
}
const styles = StyleSheet.create({
  shell: { backgroundColor: colors.electric, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 16 },
  cell: { paddingVertical: 32, paddingHorizontal: 24, gap: 14 },
  rightBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.25)' },
  bottomBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.25)' },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 16 },
  value: { fontFamily: fonts.display, color: colors.text, fontSize: 64, lineHeight: 72, letterSpacing: -2 },
  unit: { fontFamily: fonts.bodyBold, color: colors.primary, fontSize: 12, letterSpacing: 1.4 },
  text: { fontFamily: fonts.body, color: colors.text, fontSize: 15, lineHeight: 24, maxWidth: 250 },
});

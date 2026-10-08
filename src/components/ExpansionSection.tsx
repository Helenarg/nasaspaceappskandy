import { useViewport } from '../theme/useViewport';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './LocalizedText';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import SriLankaShape from './SriLankaShape';
import ActionLink from './ActionLink';
import Reveal from './Reveal';

const STEPS = [
  ['01', 'Rooted in Kandy', 'A meeting point for curious minds, local mentorship, and hands-on collaboration.'],
  ['02', 'Connected across Sri Lanka', 'Our ambition is to make space innovation accessible to schools and universities in all nine provinces.'],
  ['03', 'Part of a global community', 'Bring your own perspective to challenges that connect our planet with the universe beyond.'],
];
export default function ExpansionSection() {
  const { width } = useViewport();
  return <View style={layout.section(width)}><Reveal style={[styles.row, { flexDirection: width < 900 ? 'column' : 'row' }]}>
    <View style={styles.content}><Text style={styles.eyebrow}>03 / LOCAL ROOTS. GLOBAL POSSIBILITIES.</Text>
      <Text accessibilityRole="header" aria-level={2} style={[styles.title, { fontSize: width < 600 ? 36 : 48, lineHeight: width < 600 ? 42 : 54 }]}>
        From Kandy.{ '\n' }<Text style={styles.highlight}>For everyone.</Text>
      </Text>
      <View style={styles.steps}>{STEPS.map(([number, title, description]) => <View style={styles.step} key={number}>
        <Text style={styles.number}>{number}</Text><View style={styles.stepContent}>
          <Text style={styles.stepTitle}>{title}</Text><Text style={styles.description}>{description}</Text>
        </View>
      </View>)}</View>
      <View style={styles.action}><ActionLink href="/ambassadors" label="BECOME A CAMPUS AMBASSADOR" secondary /></View>
    </View>
    <View style={[styles.map, { width: width < 900 ? '100%' : '42%' }]}>
      <Text style={styles.mapCaption}>SRI LANKA / 7.29° N, 80.63° E</Text>
      <SriLankaShape width={width < 600 ? 200 : 240} />
      <View style={styles.mapFooter}><View style={styles.dot} /><Text style={styles.mapCaption}>KANDY · OUR STARTING POINT</Text></View>
    </View>
  </Reveal></View>;
}
const styles = StyleSheet.create({
  row: { gap: 56, alignItems: 'stretch' },
  content: { flex: 1 },
  eyebrow: { color: colors.primary, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.3, marginBottom: 24 },
  title: { color: colors.text, fontFamily: fonts.display, letterSpacing: -1.2 },
  highlight: { color: colors.primary },
  steps: { marginTop: 32 },
  step: { flexDirection: 'row', gap: 20, paddingVertical: 24, borderTopWidth: 1, borderTopColor: colors.border },
  number: { color: colors.secondaryHover, fontFamily: fonts.body, fontSize: 12, marginTop: 4 },
  stepContent: { flex: 1 },
  stepTitle: { fontFamily: fonts.heading, color: colors.text, fontSize: 21, marginBottom: 10 },
  description: { fontFamily: fonts.body, fontSize: 16, lineHeight: 26, color: colors.textMuted },
  action: { marginTop: 24, alignSelf: 'flex-start' },
  map: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, backgroundColor: 'rgba(0,66,166,0.2)',
    alignItems: 'center', justifyContent: 'space-between', paddingVertical: 32, paddingHorizontal: 24, gap: 28 },
  mapCaption: { color: colors.textMuted, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2 },
  mapFooter: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondary },
});

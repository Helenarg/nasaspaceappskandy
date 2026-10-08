import { useViewport } from '../theme/useViewport';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './LocalizedText';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import Reveal from './Reveal';
import Headline from './Headline';

export default function PageHeader({ number, eyebrow, title, description, children }: {
  number: string; eyebrow: string; title: string; description: string; children?: React.ReactNode;
}) {
  const { width } = useViewport();
  return <View style={[layout.container(width), { paddingTop: layout.sectionSpace(width), paddingBottom: 40 }]}>
    <Reveal distance={24}><View style={styles.eyebrowRow}>
      <Text style={styles.number}>{number} /</Text><Text style={styles.eyebrow}>{eyebrow}</Text><View style={styles.rule} />
    </View></Reveal>
    <Headline title={title} style={[styles.title,
      { fontSize: width < 600 ? 40 : 64, lineHeight: width < 600 ? 46 : 70 }]} />
    <Reveal delay={300} distance={28}><Text style={styles.description}>{description}</Text>
    {children ? <View style={styles.controls}>{children}</View> : null}</Reveal>
  </View>;
}
const styles = StyleSheet.create({
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 },
  number: { color: colors.primary, fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.5 },
  eyebrow: { color: colors.textMuted, fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.5, flexShrink: 1 },
  rule: { height: 1, backgroundColor: colors.border, flex: 1, marginLeft: 12 },
  title: { color: colors.text, fontFamily: fonts.display, letterSpacing: -1.5, maxWidth: 900, marginBottom: 24 },
  description: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 18, lineHeight: 29, maxWidth: 720 },
  controls: { marginTop: 32 },
});

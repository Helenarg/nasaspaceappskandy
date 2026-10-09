import { Pressable } from './LocalizedPressable';
import { useViewport } from '../theme/useViewport';
import React from 'react';
import { Link } from 'expo-router';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import { Text } from './LocalizedText';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import BrandLogo from './BrandLogo';
import ActionLink from './ActionLink';
import MotionToggle from './MotionToggle';

const LINKS = [
  { title: 'DISCOVER', items: [['About the initiative', '/about'], ['Events & workshops', '/events'], ['Explore challenges', '/challenges'], ['News & media', '/news']] },
  { title: 'GET INVOLVED', items: [['How to participate', '/participation'], ['Register your interest', '/register'], ['Volunteer & mentor', '/join'], ['Campus ambassadors', '/ambassadors'], ['Partners & sponsors', '/sponsors'], ['Contact us', '/contact'], ['Local data notice', '/privacy']] },
] as const;
export default function Footer() {
  const { width } = useViewport();
  return <View {...(Platform.OS === 'web' ? { role: 'contentinfo' as const } : {})} style={styles.shell}><View style={[layout.container(width), { paddingTop: 64, paddingBottom: 32 }]}>
    <View style={[styles.top, { flexDirection: width < 1100 ? 'column' : 'row' }]}>
      <Text accessibilityRole="header" aria-level={2} style={[styles.ctaTitle, { fontSize: width < 600 ? 36 : 48 }]}>Curiosity starts{ '\n' }something extraordinary.</Text>
      <View style={styles.cta}><ActionLink href="/participation" label="START YOUR JOURNEY" /></View>
    </View>
    <View style={[styles.columns, { flexDirection: width < 900 ? 'column' : 'row' }]}>
      <View style={styles.brandColumn}><BrandLogo /><Text style={styles.description}>A local community in Kandy, connected by a shared mission to explore, collaborate, and create with NASA’s open data.</Text>
        <Text style={styles.local}>SRI LANKA · KANDY LOCAL EVENT</Text>
      </View>
      <View style={[styles.linkColumns, { flexDirection: width < 400 ? 'column' : 'row' }]}>{LINKS.map(group => <View key={group.title} style={styles.linkColumn}>
        <Text style={styles.label}>{group.title}</Text>{group.items.map(([label, href]) => <Link href={href} key={href} asChild>
          <Pressable accessibilityRole="link" style={styles.link}><Text style={styles.linkText}>{label}</Text></Pressable>
        </Link>)}
      </View>)}</View>
    </View>
    <View style={styles.bottom}>
      <MotionToggle />
      <Text style={styles.fine}>© 2026 NASA SPACE APPS SRI LANKA · KANDY LOCAL ORGANIZING COMMITTEE</Text>
      <Text style={styles.fine}>Earth photography: NASA. Cosmic Cliffs: NASA, ESA, CSA, STScI. Map: OpenStreetMap contributors / geoBoundaries (ODbL 1.0).</Text>
      <Pressable style={{ minHeight: 44, justifyContent: 'center' }} accessibilityRole="link" onPress={() => Linking.openURL('https://www.spaceappschallenge.org/brand/')}>
        <Text style={styles.source}>SPACE APPS BRAND & RESOURCES ↗</Text>
      </Pressable>
    </View>
  </View></View>;
}
const styles = StyleSheet.create({
  shell: { backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border },
  top: { gap: 32, justifyContent: 'space-between', paddingBottom: 56, borderBottomWidth: 1, borderBottomColor: colors.border },
  ctaTitle: { color: colors.text, fontFamily: fonts.display, letterSpacing: -1, lineHeight: 54, flex: 1, minWidth: 0 },
  cta: { alignSelf: 'center', maxWidth: '100%', flexShrink: 1 },
  columns: { gap: 56, paddingVertical: 56 },
  brandColumn: { flex: 1, alignItems: 'flex-start', gap: 24 },
  description: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 16, lineHeight: 26, maxWidth: 380 },
  local: { color: colors.primary, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.5 },
  linkColumns: { flex: 1, gap: 40 },
  linkColumn: { flex: 1, alignItems: 'flex-start' },
  label: { color: colors.textMuted, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.5, marginBottom: 18 },
  link: { paddingVertical: 10, minHeight: 44 },
  linkText: { color: colors.text, fontFamily: fonts.body, fontSize: 15 },
  bottom: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 28, gap: 14 },
  fine: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 11, lineHeight: 19 },
  source: { color: colors.primary, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, paddingVertical: 8 },
});
